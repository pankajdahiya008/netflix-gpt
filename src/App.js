import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <Provider store={appStore}>
      <Analytics/>
      <SpeedInsights />
      <Body />
    </Provider>
  );
}

export default App;
