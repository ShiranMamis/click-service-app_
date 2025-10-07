import React, { useState, useEffect } from "react";
import InputCalendar from "../global/InputCalendar";
import TimePicker from "../global/TimePicker";
import SelectBarComp from "../global/SelectBarComp";
import { SelectBarItems } from "../global/SelectBarItemsComp";
import Statement from "./Statement";

export default function InputBoxFileComp(props) {
  const [formData, setFormData] = useState([]); // State to hold form data
  const [formValues, setFormValues] = useState({}); // אחסון הערכים של כל השדות
  const [startTimeSelected, setStartTimeSelected] = useState(""); // For start time
  const [itemSelected, setItemSelected] = useState(""); // For selected item
  const [endTimeSelected, setEndTimeSelected] = useState(""); // For end time
  const [isStatement, setIsStatement] = useState(false);

  // Function to handle field change
  const handleInputChange = (fieldName, value) => {
    setFormValues((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  useEffect(() => {
    setFormData(props.fields);
  }, [props.fields]);


  // const handleSubmit = () => {
  //   const result = fromFieldId.map(fieldId => ({
  //     field_name: fieldId,
  //     value: formValues[fieldId] || "" // אם לא הוזן ערך, יש להשאיר ריק
  //   }));
  //   console.log(result); // אפשר לשלוח את המערך הזה לשרת או לאן שצריך
  // };

  const handleSubmit = () => {
    const result = {
      booking_type_id: formValues["booking_type_id"] || ""
    };
    formData.forEach((field, index) => {
      const fieldKey = `field_${index + 1}`;
      result[fieldKey] = formValues[field.field_name] || "";
    });
    console.log(result);
  };

  // Function to handle selected time
  const handleTimeSelected = (time, type) => {
    if (type === "שעת התחלה") {
      setStartTimeSelected(time);
    } else if (type === "שעת סיום") {
      setEndTimeSelected(time);
    }
  };

  const handleStatementClick = () => {
    setIsStatement(true);
  };
  console.log("startTimeSelected ", startTimeSelected)
  console.log("endTimeSelected   ", endTimeSelected)

  console.log("formData --> ", formData)
  console.log("itemSelected => ", itemSelected)
  return (
    <div className="p-2">
      <div className="flex flex-col space-y-5">
        {formData?.map((field) => {
          switch (field.field_type) {
            case "number":
              return (
                <div key={field.id}>
                  <label>{field.field_name}</label>
                  <input
                    type="number"
                    value={formData[field.field_name] || ""}
                    onChange={(e) => handleInputChange(field.field_name, e.target.value)}
                  />
                </div>
              );
            case "select":
              console.log(field.field_options)
              return (
                <div key={field.id}>
                  {/* <SelectBarItems
                    text={field.field_display_name}
                    items={field.field_options}    // items should be an array
                    selectedItem={itemSelected}  // currently selected item
                    title={field.field_display_name}
                    onItemSelected={(item) => setItemSelected(item)}  // callback to handle selection
                    itemsValue={itemSelected}  // selected value from formData
                    // onItemsChange={props.onItemsChange}
                    //onItemsChange={(e) => handleInputChange(field.field_name, e.target.value)}  // handle input change                  
                    isChevronDown={true}// if there is a chevron down
                  /> */}
                  <SelectBarItems
                    text={field.field_display_name}
                    items={field.field_options}    // מערך של אפשרויות (רק המיתרים)
                    selectedItem={itemSelected}    // הערך הנבחר כרגע
                    title={field.field_display_name} // כותרת לתצוגה
                    onItemSelected={(item) => setItemSelected(item)} // עדכון הערך הנבחר כשנבחרת אופציה
                    itemsValue={itemSelected} // הערך הנבחר הנוכחי
                    isChevronDown={true}   // הצגת חץ כלפי מטה
                  />
                </div>
              );
            case "date":
              return (
                <div key={field.id}>
                  <InputCalendar
                    title={field.field_display_name}
                    date={"11.2.24"}
                    setData={(date) => handleInputChange(field.field_name, date)}
                  />
                </div>
              );
            case "time":
              return (
                <div key={field.id}>
                  <TimePicker
                    title={field.field_display_name}
                    type={field.field_display_name}
                    selectedTime={field.field_display_name === "שעת התחלה" ? startTimeSelected : endTimeSelected}
                    onTimeSelected={(time) => handleTimeSelected(time, field.field_display_name)}
                  />
                </div>
              );
            default:
              return null;
          }
        })}
        {props?.statement && (
          <Statement
            statement={props.statement}
            isStatement={isStatement}
            onClose={() => setIsStatement(false)}
            onSelect={props.onSelect}
          />
        )}
        <button
          className="w-full h-[5vh] items-center mt-5 bg-medium-blue rounded-xl justify-center shadow-sm flex text-[rgba(255,255,255,1)]"
          onClick={handleSubmit}
        >
          אישור
        </button>
      </div>
    </div >
  );
}
