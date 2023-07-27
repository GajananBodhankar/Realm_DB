import {useMemo, useState} from 'react';

function ContextData() {
  const [mainData, setMainData] = useState([]);
  const memodata = useMemo(
    () => ({mainData, setMainData}),
    [mainData, setMainData],
  );
  return {memodata};
}
export default ContextData;
