import { useForm, SubmitHandler } from "react-hook-form";
import { Activity } from "../models/activity";

type Inputs = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  city: string;
  venue: string;
};

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
}

export default function ActivityForm({
  activity,
  closeForm,
  createOrEdit,
  submitting,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (activity) => {
    createOrEdit(activity);
  };

  // console.log(watch("title")); // watch input value by passing the name of it

  return (
    <form
      className="flex flex-col items-center p-4 card mx-auto bg-base-100 shadow-md space-y-4 w-[400px]"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div className="flex flex-col space-y-2 w-full items-center">
        <input
          defaultValue={activity?.title ?? ""}
          className="form-input"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}

        <input
          defaultValue={activity?.description ?? ""}
          className="form-input"
          placeholder="Description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-red-500">Description is required</span>
        )}

        <input
          defaultValue={activity?.category ?? ""}
          className="form-input"
          placeholder="Category"
          {...register("category", { required: true })}
        />
        {errors.category && (
          <span className="text-red-500">Category is required</span>
        )}

        <input
          defaultValue={activity?.date ?? ""}
          className="form-input"
          placeholder="Date"
          type="date"
          {...register("date", { required: true })}
        />
        {errors.date && <span className="text-red-500">Date is required</span>}

        <input
          defaultValue={activity?.city ?? ""}
          className="form-input"
          placeholder="City"
          {...register("city", { required: true })}
        />
        {errors.city && <span className="text-red-500">City is required</span>}

        <input
          defaultValue={activity?.venue ?? ""}
          className="form-input"
          placeholder="Venue"
          {...register("venue", { required: true })}
        />
        {errors.venue && (
          <span className="text-red-500">Venue is required</span>
        )}
      </div>

      <div className="btn-group">
        <button type="submit" className="btn btn-active">
          {submitting ? (
            <span className="animate-bounce">Submitting</span>
          ) : (
            "Submit"
          )}
        </button>
        <button onClick={() => closeForm()} className="btn">
          Cancel
        </button>
      </div>
    </form>
  );
}
