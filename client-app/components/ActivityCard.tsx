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
    <div className="space-y-3">
      {activities.map((act) => (
        <div className="card w-96 bg-base-100 shadow-xl" key={act.id}>
          <div className="card-body space-y-1">
            <section>
              <h2 className="card-title">{act.title}</h2>
              <p className="text-sm text-gray-400">{act.date}</p>
            </section>

            <section>
              <p>{act.description}</p>
              <p className="text-sm font-semibold">{act.venue}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline bg-secondary text-white">
                  {act.category}
                </div>
              </div>
            </section>

            <section>
              <div className="btn-group w-full">
                <button
                  onClick={() => selectActivity(act.id)}
                  className="btn btn-active w-1/2"
                >
                  View
                </button>
                <button
                  onClick={() => deleteActivity(act.id)}
                  className="btn btn-error w-1/2"
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
