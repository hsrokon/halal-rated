import { FaUser } from "react-icons/fa";


const AddReviews = () => {
    return (
        <div>
            <form>
                <label className="input validator">
                <FaUser></FaUser>
                <input
                    type="text"
                    required
                    placeholder="Username"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minlength="3"
                    maxlength="30"
                    title="Only letters, numbers or dash"
                />
                </label>
            </form>
        </div>
    );
};

export default AddReviews;