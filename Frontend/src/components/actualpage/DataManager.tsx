"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Maximize2, ChevronDown, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { GetUserDetails } from "../utils/DbSchema";

// Generic type for all financial data types
type FinancialData = {
  userId: string;
  [key: string]: any;
};

// Props for the component
interface FinancialTrackerProps<T extends FinancialData> {
  title: string;
  baseURL: string;
  endpoints: {
    getByUserId: string;
    post: string;
    put: string;
    delete: string;
  };
  getUserId: string;
  fields: {
    name: keyof T;
    label: string;
    type: "text" | "number" | "date" | "boolean" | "select";
    required?: boolean;
    min?: number;
    options?: { value: string; label: string }[]; // For select fields
  }[];
  idField: keyof T;
  displayFields: {
    name: keyof T;
    label: string;
    format?: (value: any, item?: any) => string;
  }[];
  formatDate?: (date: string) => string;
  defaultValues: Partial<T>;
}

export default function DataManager<T extends FinancialData>({
  title,
  baseURL,
  endpoints,
  getUserId,
  fields,
  idField,
  displayFields,
  formatDate = (date) => new Date(date).toLocaleDateString(),
  defaultValues,
}: FinancialTrackerProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [update, setUpdate] = useState<{
    state: boolean;
    id: string | null;
  }>({ state: false, id: null });
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);

  function fetchData() {
    axios
      .get(baseURL + endpoints.getByUserId + getUserId, {
        headers: {
          Authorization: `bearer ${GetUserDetails().jwt_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<T>({
    defaultValues: defaultValues as any,
  });

  function deleteItem(id: string) {
    axios
      .delete(baseURL + endpoints.delete + id, {
        headers: {
          Authorization: `bearer ${GetUserDetails().jwt_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((_) => toast.success("Deleted Successfully"))
      .then((_) => fetchData())
      .catch((err) => toast.error("Error: " + err));
  }

  function updateItem(item: T) {
    reset(item as any);
    setUpdate({ state: true, id: item[idField] as string });
  }

  const onSubmit = (formData: T) => {
    // Process date fields if needed
    const processedData = { ...formData };

    fields.forEach((field) => {
      if (field.type === "date" && processedData[field.name]) {
        const dateValue = new Date(processedData[field.name] as string);
        processedData[field.name] = dateValue
          .toISOString()
          .split("T")[0] as any;
      }
    });

    // Add userId
    processedData.userId = getUserId;

    if (update.state) {
      axios
        .put(baseURL + endpoints.put + update.id, processedData, {
          headers: {
            Authorization: `bearer ${GetUserDetails().jwt_token}`,
            "Content-Type": "application/json",
          },
        })
        .then((_) => toast.success("Updated Successfully"))
        .then((_) => fetchData())
        .catch((err) => {
          toast.error("Error: " + err);
          console.log(processedData);
        });

      reset(defaultValues as any);
      setUpdate({ state: false, id: null });
    } else {
      axios
        .post(baseURL + endpoints.post, processedData, {
          headers: {
            Authorization: `bearer ${GetUserDetails().jwt_token}`,
            "Content-Type": "application/json",
          },
        })
        .then((_) => toast.success("Added Successfully"))
        .then((_) => fetchData())
        .catch((err) => {
          toast.error("Error: " + err);
          console.log(processedData);
        });

      reset(defaultValues as any);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-background p-4 sm:p-6 md:p-8 space-y-6">
      <Toaster />
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-primary mt-14 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(90,90,90,1)] hover:shadow-[8px_8px_0px_0px_rgba(90,90,90,1)] transition-all"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-text font-Heading">
              {update.state ? `Update ${title}` : `Add New ${title}`}
            </h1>
            <button
              onClick={() => setIsFormCollapsed(!isFormCollapsed)}
              className="text-gray-500 hover:text-gray-700 bg-white border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
            >
              {isFormCollapsed ? (
                <Maximize2 size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </div>

          <AnimatePresence>
            {!isFormCollapsed && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fields.map((field) => (
                    <div key={field.name as string}>
                      <label className="block text-sm font-bold text-background mb-1">
                        {field.label}
                      </label>

                      {field.type === "date" ? (
                        <Controller
                          control={control}
                          name={field.name as any}
                          rules={{
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          }}
                          render={({ field: controllerField }) => (
                            <DatePicker
                              selected={
                                controllerField.value
                                  ? new Date(controllerField.value)
                                  : null
                              }
                              onChange={(date) =>
                                controllerField.onChange(date)
                              }
                              className="w-full px-3 py-2 bg-gray-100 border-2 border-black rounded-lg 
                              shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                              transition-all focus:outline-none text-black"
                              placeholderText={`Select ${field.label.toLowerCase()}`}
                              dateFormat="MMMM d, yyyy"
                              calendarClassName="!border-black !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            />
                          )}
                        />
                      ) : field.type === "boolean" ? (
                        <select
                          {...register(field.name as any, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          className="w-full px-3 py-2 bg-secondary border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:outline-none"
                        >
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      ) : field.type === "select" && field.options ? (
                        <select
                          {...register(field.name as any, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          className="w-full px-3 py-2 bg-secondary border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:outline-none"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          onWheel={(e) =>
                            field.type === "number" &&
                            e.target instanceof HTMLElement &&
                            e.target.blur()
                          }
                          {...register(field.name as any, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                            min:
                              field.min !== undefined
                                ? {
                                    value: field.min,
                                    message: `${field.label} must be at least ${field.min}`,
                                  }
                                : undefined,
                            valueAsNumber: field.type === "number",
                          })}
                          className="w-full px-3 py-2 bg-secondary border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:outline-none"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      )}

                      {errors[field.name] && (
                        <p className="mt-1 text-sm text-red-500 font-bold">
                          {errors[field.name]?.message as string}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      reset(defaultValues as any);
                      setUpdate({ state: false, id: null });
                    }}
                    className="px-4 py-2 bg-secondary border-2 border-black rounded-lg font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary border-2 border-black rounded-lg font-bold text-bgbg-secondary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                  >
                    {update.state ? `Update ${title}` : "Submit"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mx-auto bg-primary rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(90,90,90,1)] hover:shadow-[8px_8px_0px_0px_rgba(90,90,90,1)] transition-all"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-Heading text-text">
              {title} List
            </h2>
            <button
              onClick={() => setIsTableCollapsed(!isTableCollapsed)}
              className="text-gray-500 hover:text-gray-700 bg-white border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
            >
              {isTableCollapsed ? (
                <Maximize2 size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </div>

          <AnimatePresence>
            {!isTableCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-scroll"
              >
                <div className="overflow-x-auto">
                  {/* Mobile View */}
                  <div className="md:hidden space-y-4">
                    {data.map((item) => (
                      <motion.div
                        key={item[idField] as string}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-secondary border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-bold text-text">
                            {displayFields[0]
                              ? displayFields[0].format
                                ? displayFields[0].format(
                                    item[displayFields[0].name]
                                  )
                                : item[displayFields[0].name]
                              : item[idField]}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateItem(item)}
                              className="p-1 bg-blue-500 text-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() =>
                                deleteItem(item[idField] as string)
                              }
                              className="p-1 bg-red-500 text-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {displayFields.slice(1).map((field, index) => (
                            <div
                              key={index}
                              className={
                                index >= displayFields.length - 2
                                  ? "col-span-2"
                                  : ""
                              }
                            >
                              <span className="font-bold text-text/50">
                                {field.label}:
                              </span>
                              <span className="ml-2 text-text">
                                {field.format
                                  ? field.format(item[field.name])
                                  : field.name.toString().includes("date") ||
                                    field.name.toString().includes("Date")
                                  ? formatDate(item[field.name] as string)
                                  : item[field.name]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:block">
                    <table className="min-w-full border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <thead className="bg-secondary border-b-2 border-black">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-black text-text/70 uppercase tracking-wider">
                            {idField.toString()}
                          </th>
                          {displayFields.map((field) => (
                            <th
                              key={field.name as string}
                              className="px-6 py-3 text-left text-xs font-black text-text/70 uppercase tracking-wider"
                            >
                              {field.label}
                            </th>
                          ))}
                          <th className="px-6 py-3 text-left text-xs font-black text-text/70 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y-2 divide-black">
                        {data.map((item) => (
                          <motion.tr
                            key={item[idField] as string}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                              {item[idField] as string}
                            </td>
                            {displayFields.map((field) => (
                              <td
                                key={field.name as string}
                                className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
                              >
                                {field.format
                                  ? field.format(item[field.name])
                                  : field.name.toString().includes("date") ||
                                    field.name.toString().includes("Date")
                                  ? formatDate(item[field.name] as string)
                                  : item[field.name]}
                              </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => updateItem(item)}
                                  className="p-1 bg-blue-500 text-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                                >
                                  <Pencil size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    deleteItem(item[idField] as string)
                                  }
                                  className="p-1 bg-red-500 text-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
