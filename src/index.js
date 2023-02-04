import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { navigate, Router } from "@gatsbyjs/reach-router";
import { Amplify, Auth } from "aws-amplify";
import oldAwsConfig from "./aws-exports";
import Suspence from "./widgets/suspence";
import { Provider } from "react-redux";
import { store } from "./store";

const App = React.lazy(() => import("./app/index"));
const root = document.getElementById("root");

Amplify.configure(oldAwsConfig);

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Suspence />}>
      <Router basepath="/">
        <App path="/*" />      
      </Router>
    </Suspense>
  </Provider>,
  root
);

//to bulk delete
//data.items.map((rec,index)=>`id${index}:deleteChannel(input: {id: "${rec.id}"}) {id}`).toString()
//data.items.map((rec,index)=>`id${index}:deleteTask(input: {id: "${rec.id}"}) {id}`).toString()
