import type { NextPage } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { Activity } from "../models/activity";
import AcitivtyDashBoard from "../components/AcitivtyDashBoard";
import Navbar from "../components/Navbar";
import { v4 as uuid } from "uuid";

const Home: NextPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const response = await axios.get<Activity[]>(
        "http://localhost:5000/api/activities"
      );
      setActivities(response.data);
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
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) =>
    setActivities([...activities.filter((x) => x.id !== id)]);

  return (
    <>
      <Navbar openForm={handleFormOpen} />
      <div className="flex min-h-screen py-2">
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
        />
      </div>
    </>
  );
};

export default Home;
