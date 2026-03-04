import axios from "axios";
import { useDispatch} from "react-redux";
import { setDistricts } from "../redux/slices/districts";
import { setStateOrUtList } from "../redux/slices/stateOrUt";


function saveStateAndDistricts(){
    const dispatch = useDispatch();
    axios.get("http://localhost:8080/api/auth/districts")
          .then(response => {
            response.data
    
            dispatch(setDistricts(response.data));
            const statesAndUTs = new Map<string, number>();
            response.data.forEach((item: any) => {
              statesAndUTs.set(item.stateorUt.stateorUtName, item.stateorUt.id);
            }
    
            );
            let stateOrUtList = Array.from(statesAndUTs.entries()).map(([name, id]) => ({ name, id }));
            //alert(JSON.stringify(statesAndUTs));
            dispatch(setStateOrUtList(stateOrUtList))
    
    
    
          })
          .catch(error => console.error('Error fetching districts data:', error));
}

export default saveStateAndDistricts;