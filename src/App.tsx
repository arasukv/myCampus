import { useEffect, useMemo, useState } from 'react';
import { ActivityList } from './components/ActivityList';
import { ActivityModal } from './components/ActivityModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Header } from './components/Header';
import { ScheduleControls } from './components/ScheduleControls';
import { Activity, ActivityCategory, ActivityFormValues } from './types/activity';
import { compareActivitiesChronologically, getTodayDateString } from './utils/dateTime';
import { generateActivityId, loadActivities, saveActivities } from './utils/storage';

export default function App() {
  const [activities, setActivities] = useState<Activity[]>(() => loadActivities());
  const [selectedDate, setSelectedDate] = useState<string>(() => getTodayDateString());
  const [selectedCategories, setSelectedCategories] = useState<ActivityCategory[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [deletingActivity, setDeletingActivity] = useState<Activity | null>(null);

  useEffect(() => {
    saveActivities(activities);
  }, [activities]);

  const activitiesForDate = useMemo(() => {
    return activities
      .filter((activity) => activity.date === selectedDate)
      .sort(compareActivitiesChronologically);
  }, [activities, selectedDate]);

  const visibleActivities = useMemo(() => {
    if (selectedCategories.length === 0) {
      return activitiesForDate;
    }
    return activitiesForDate.filter((activity) =>
      selectedCategories.includes(activity.category),
    );
  }, [activitiesForDate, selectedCategories]);

  const handleToggleCategory = (category: ActivityCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
  };

  const handleClearCategories = () => {
    setSelectedCategories([]);
  };

  const handleAddActivity = (values: ActivityFormValues) => {
    const newActivity: Activity = {
      id: generateActivityId(),
      title: values.title,
      category: values.category,
      date: values.date,
      startTime: values.startTime,
      endTime: values.endTime,
      status: 'Pending',
      notes: values.notes,
    };

    setActivities((prev) => [...prev, newActivity]);
    setSelectedDate(values.date);
    setIsAddModalOpen(false);
  };

  const handleEditActivity = (values: ActivityFormValues) => {
    if (!editingActivity) {
      return;
    }

    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === editingActivity.id
          ? {
              ...activity,
              title: values.title,
              category: values.category,
              date: values.date,
              startTime: values.startTime,
              endTime: values.endTime,
              status: values.status,
              notes: values.notes,
            }
          : activity,
      ),
    );
    setSelectedDate(values.date);
    setEditingActivity(null);
  };

  const handleToggleComplete = (id: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              status: activity.status === 'Completed' ? 'Pending' : 'Completed',
            }
          : activity,
      ),
    );
  };

  const handleConfirmDelete = () => {
    if (!deletingActivity) {
      return;
    }
    setActivities((prev) => prev.filter((activity) => activity.id !== deletingActivity.id));
    setDeletingActivity(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header onAddClick={() => setIsAddModalOpen(true)} />

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <ScheduleControls
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          onClearCategories={handleClearCategories}
        />

        <ActivityList
          activities={visibleActivities}
          totalForDateCount={activitiesForDate.length}
          selectedDate={selectedDate}
          selectedCategories={selectedCategories}
          onToggleComplete={handleToggleComplete}
          onEdit={(activity) => setEditingActivity(activity)}
          onDelete={(activity) => setDeletingActivity(activity)}
          onAddClick={() => setIsAddModalOpen(true)}
          onClearFilters={handleClearCategories}
        />
      </main>

      {isAddModalOpen && (
        <ActivityModal
          mode="add"
          defaultDate={selectedDate}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddActivity}
        />
      )}

      {editingActivity && (
        <ActivityModal
          mode="edit"
          defaultDate={selectedDate}
          initialActivity={editingActivity}
          onClose={() => setEditingActivity(null)}
          onSave={handleEditActivity}
        />
      )}

      {deletingActivity && (
        <DeleteConfirmModal
          activity={deletingActivity}
          onCancel={() => setDeletingActivity(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
