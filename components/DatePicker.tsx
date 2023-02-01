import { Calendar } from "react-calendar";
import { useState } from "react";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  padding: 5px;
  border-radius: 15px;
  font-family: "Noto Sans KR";
  width: 40%;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
`;

export default function DatePicker() {
  const [date, setDate] = useState<Date[]>([]);

  return (
    <div className="calendar-container">
      <InputBox>
        <Input
          id="startDt"
          readOnly
          value={date[0] ? moment(date[0]).format("YYYY-MM-DD") : ""}
        />
        <Input
          id="endDt"
          readOnly
          value={date[1] ? moment(date[1]).format("YYYY-MM-DD") : ""}
        />
      </InputBox>
      <Calendar
        onChange={setDate}
        formatDay={(locale, date) => moment(date).format("DD")}
        selectRange={true}
      />
    </div>
  );
}
