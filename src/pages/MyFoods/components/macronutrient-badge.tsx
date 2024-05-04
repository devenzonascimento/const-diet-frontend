interface MacronutrientBadgeProps {
  color: string;
  children: string;
}

const MacronutrientBadge = ({color, children}: MacronutrientBadgeProps) => {
  return (
    <p className={`px-1 block font-medium text-${color}-600 bg-${color}-100 rounded-lg`}>
      {children}
    </p>
  );
};

export default MacronutrientBadge;
