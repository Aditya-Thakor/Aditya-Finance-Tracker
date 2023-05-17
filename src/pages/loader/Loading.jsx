import React from "react";
import { Loader, Placeholder } from "rsuite";

const Loading = (props) => {
  const { rows, content } = props;
  return (
    <div>
      <Placeholder.Paragraph rows={rows} />
      <Loader backdrop content={content} vertical />
    </div>
  );
};

export default Loading;
