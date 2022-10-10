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
  submitting: boolean;
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
  submitting,
}: Props) => {
  return (
    <div className="flex w-full">
      <div className="overflow-scroll p-3">
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
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
};

export default AcitivtyDashBoard;
