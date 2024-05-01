const Card = ({ children }) => {
  return (
    <div className="px-14 py-14 bg-secondary w-4/12 flex flex-col rounded-lg justify-center items-center">
      {children}
    </div>
  );
};

export default Card;
