// import { createTask, getTaskDetails, updateTask } from "../api/task.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const TaskFormPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const handleSave = () => {
        // const title = document.getElementById("title").value;
        // const description = document.getElementById("description").value;
        // const done = document.getElementById("default-checkbox").checked;

        // const task = {
        //     title,
        //     description,
        //     done,
        // };

        // if (params.id) {
        //     updateTask(params.id, task)
        // }else{
        //     createTask(task);
        // }

        navigate("/tasks/");
    };

    const cleanUp = () => {
        // document.getElementById("title").value = '';
        // document.getElementById("description").value = '';
        // document.getElementById("default-checkbox").checked = false;
    }

    // const showTaskDetails = async (id) => {
    //     const task = await getTaskDetails(id);

    //     document.getElementById("title").value = task.title;
    //     document.getElementById("description").value = task.description;
    //     document.getElementById("default-checkbox").checked = task.done;
    // };

    useEffect(() => {
        if (params.id) {
            // showTaskDetails(params.id);
        }else{
            cleanUp()
        }
    }, [params]);

    return (
        <div className="w-full max-w-sm m-5">
            <form className="bg-[#2b2c4f] shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="title..."
                        name="title"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="description">
                        description
                    </label>
                    <textarea
                        className="h-40 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        // type="textarea"
                        placeholder="description..."
                        name="description"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <label htmlFor="default-checkbox" className="me-3 block text-gray-200 text-sm font-bold ">
                            Done:
                        </label>
                        <input
                            name="done"
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-2/5"
                        type="button"
                        onClick={handleSave}
                    >
                        {params.id ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskFormPage;
