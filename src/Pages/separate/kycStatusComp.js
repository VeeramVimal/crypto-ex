// import { MdDone, MdAccessTime, MdDangerous } from "react-icons/md";
import { VscVerified, VscUnverified, VscWarning, VscWatch  } from "react-icons/vsc";

export default function KycStatusComp(props) {
    const {
        status = ""
    } = props;
    return (
        status === 0
        ?
            <small className="text-warning"><VscWatch /> Waiting for approval</small>
        :
            status === 1
            ?
                <small className="text-success"><VscVerified /> Verified</small>
            :
                status === 2
                ?
                    <small className="text-danger"><VscWarning /> Rejected</small>
                :
                status === 3
                    ?
                        <small className="text-danger"><VscUnverified /> Not Verified</small>
                    :
                        <></>
    )
};