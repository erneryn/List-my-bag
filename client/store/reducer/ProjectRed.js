const initalState = {
  project: [],
};

const projectsReducer = (state = initalState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "ALL_PROJECT":
      return { ...state, project: action.payload.allProject };
    case "ADD_PROJECT":
      return {
        ...state,
        project: state.project.concat(action.payload.newProject),
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        project: state.project.filter(
          (e) => e.name !== action.payload.willDeleted
        ),
      };
    default:
      return state;
  }
};

export default projectsReducer;
