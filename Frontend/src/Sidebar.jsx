import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";
import blacklogo from "./assets/blacklogo.jpg";

function Sidebar() {

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch("https://neuronix-openai-platform-backend.onrender.com/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title,  userId: thread.userId}));
            setAllThreads(filteredData);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId])


    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(`https://neuronix-openai-platform-backend.onrender.com/api/thread/${newThreadId}`);
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch(err) {
            console.log(err);
        }
    }   

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`https://neuronix-openai-platform-backend.onrender.com/api/thread/${threadId}`, {method: "DELETE",  headers:{userid: currentUser.id}});
            const res = await response.json();
            console.log(res);

            //updated threads re-render
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if(threadId === currThreadId) {
                createNewChat();
            }

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <section className="sidebar">
            <button onClick={createNewChat}>
                <img src={blacklogo} alt="gpt logo" className="logo" />
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            <div className="history-header">
                Recent Chats
            </div>

            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx} 
                            onClick={(e) => changeThread(thread.threadId)}
                            className={thread.threadId === currThreadId ? "highlighted": " "}
                        >
                            {thread.title}
                            {
                                thread.userId === currentUser.id && (

                                    <i
                                        className="fa-solid fa-trash-can"
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            deleteThread(thread.threadId);
                                        }}
                                    ></i>

                                )
                            }
                        </li>
                    ))
                }
            </ul>
 
            <div className="sign">
                <div className="user-name">
                    Designed By Anuj Kumar &hearts;
                </div>

                <div className="user-role">
                    Neuronix User
                </div>
            </div>
        </section>
    )
}

export default Sidebar;





