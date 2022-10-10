import { Activity } from "../models/activity";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

const ActivityCard = ({
  activities,
  selectActivity,
  deleteActivity,
}: Props) => {
  return (
    <div className="space-y-4">
      {activities.map((act) => (
        <div className="card w-96 bg-base-100 shadow-xl" key={act.id}>
          <div className="card-body space-y-4">
            <section>
              <div className="flex justify-between items-center">
                <h2 className="card-title">{act.title}</h2>
                <div className="badge badge-outline badge-secondary">
                  {act.category}
                </div>
              </div>

              <p className="text-sm text-gray-400">{act.date}</p>
            </section>

            <section>
              <p>{act.description}</p>
              <p className="text-sm font-semibold">{act.venue}</p>
            </section>

            <section>
              <div className="btn-group w-full">
                <button
                  onClick={() => selectActivity(act.id)}
                  className="btn btn-active w-2/3"
                >
                  View
                </button>
                <button
                  onClick={() => deleteActivity(act.id)}
                  className="btn btn-error btn-outline w-1/3"
                >
                  Delete
                </button>
              </div>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityCard;
