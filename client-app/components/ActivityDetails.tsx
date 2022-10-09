import { Activity } from "../models/activity";
import Image from "next/image";

interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}

const ActivityDetails = ({
  activity,
  cancelSelectActivity,
  openForm,
}: Props) => {
  return (
    <div className="card w-5/6 mx-auto bg-base-100 shadow-xl space-y-4">
      <figure>
        <Image
          src={`/Images/categoryImages/${activity.category}.jpg`}
          alt="Category image"
          objectFit="cover"
          width={700}
          height={250}
        />
      </figure>
      <div className="card-body space-y-2">
        <section>
          <h2 className="card-title">{activity.title}</h2>
          <p className="text-sm text-gray-400">{activity.date}</p>
        </section>

        <section className="space-y-1">
          <p>{activity.description}</p>
          <p className="text-sm font-semibold">{activity.venue}</p>
        </section>
        <section>
          <div className="btn-group w-full">
            <button
              onClick={() => openForm(activity.id)}
              className="btn btn-active w-1/2"
            >
              Edit
            </button>
            <button
              onClick={() => cancelSelectActivity()}
              className="btn w-1/2"
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ActivityDetails;
