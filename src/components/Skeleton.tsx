const SkeletonBoard = () => {
  return (
    <div className="skeleton-columns">
      {Array.from({ length: 4 }).map((_, i) => (
        <div className="skeleton-column" key={i}>
          <div className="skeleton-column-title" />
          <div className="skeleton-task-button" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonBoard;
