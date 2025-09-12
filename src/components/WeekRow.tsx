import DayCell from "./DayCell";

interface WeekRowProps {
  week: Date[];
  selectedKey: string;
  isExpanded: boolean;                 
  onSelectDay?: (date: Date) => void;
}

const WeekRow: React.FC<WeekRowProps> = ({ week, selectedKey, isExpanded, onSelectDay }) => {
  return (
    <div className={`week-row ${isExpanded ? "expanded" : "compact"}`}>
      {week.map((day, i) => (
        <DayCell
          key={i}
          date={day}
          isExpanded={isExpanded}
          selectedKey={selectedKey}
          onSelectDay={onSelectDay}
      />
  ))}
</div>
  );
};

export default WeekRow;
