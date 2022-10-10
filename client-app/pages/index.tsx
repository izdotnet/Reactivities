import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import { Activity } from "../models/activity";
import AcitivtyDashBoard from "../components/AcitivtyDashBoard";
import LoadingComponent from "../components/LoadingComponent";
import Navbar from "../components/Navbar";
import { v4 as uuid } from "uuid";
import agent from "../helpers/agent";

const Home: NextPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await agent.Activities.list();

      //Fixing the date string
      let activities: Activity[] = [];
      response.forEach((act) => {
        act.date = act.date.split("T")[0];
        activities.push(act);
      });

      setActivities(response);
      setLoading(false);
    })();
  }, []);

  const handleSelectActivity = (id: string) =>
    setSelectedActivity(activities.find((x) => x.id === id));

  const handleCancelSelectActivity = () => setSelectedActivity(undefined);

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => setEditMode(false);

  const handleCreateEditActivity = (activity: Activity) => {
    setSubmitting(true);

    const setActivityHelper = () => {
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    };

    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setActivityHelper();
      });
    } else {
      activity.id == uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setActivityHelper();
      });
    }
  };

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  };

  if (loading) return <LoadingComponent />;

  return (
    <div data-theme="">
      <Navbar openForm={handleFormOpen} />
      <div className="flex h-[92vh] py-2">
        <AcitivtyDashBoard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </div>
    </div>
  );
};

export default Home;
