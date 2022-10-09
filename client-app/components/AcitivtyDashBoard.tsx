import { Activity } from "../models/activity";
import ActivityCard from "./ActivityCard";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

const AcitivtyDashBoard = ({
  activities,
  selectActivity,
  selectedActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteActivity,
}: Props) => {
  return (
    <div className="flex w-full">
      <div className="">
        <ActivityCard
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      </div>

      <div className="divider divider-horizontal"></div>

      <div className="flex flex-col items-center space-y-7">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            createOrEdit={createOrEdit}
          />
        )}
      </div>
    </div>
  );
};

export default AcitivtyDashBoard;
