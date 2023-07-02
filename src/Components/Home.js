import Notes from "./Notes";

export const Home = (props) => {
  const { showAlert } = props;
  // console.log(showAlert,typeof showAlert,5)
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};
