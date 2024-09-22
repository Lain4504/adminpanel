import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification, Button } from 'antd';

const New = ({ inputs, title, handleAdd, location }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await handleAdd(data);
      notification.success({
        message: 'Success',
        description: 'Item has been successfully added.',
      });
      navigate(location);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while adding the item.',
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
        <div className="mt-6">
          <form onSubmit={handleAddItem} className="space-y-4">
            {inputs.map((input) => (
              <div className="flex flex-col" key={input.id}>
                <label className="mb-2 text-sm font-medium text-gray-700">{input.label}</label>

                {input.type === 'select' ? (
                  <select
                    id={input.id}
                    value={data[input.id] || 'false'}
                    onChange={handleInput}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {input.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                )}
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-indigo-600 text-white transition"
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                className="bg-gray-500 text-white transition"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
