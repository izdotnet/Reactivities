import { UserGroupIcon } from "@heroicons/react/24/solid";

interface Props {
  openForm: (id: string) => void;
}

const Navbar = ({ openForm }: Props) => {
  return (
    <div className="navbar top-0 sticky z-50 bg-base-100 py-2 shadow-md">
      <section className="navbar-start space-x-2">
        <UserGroupIcon className="h-6" />
        <a className="normal-case text-xl">Reactivities</a>
      </section>
      <section className="navbar-end space-x-3">
        <a className="btn btn-secondary btn-outline">Activities</a>
        <button onClick={() => openForm()} className="btn btn-primary">
          Create Activity
        </button>
      </section>
    </div>
  );
};

export default Navbar;
