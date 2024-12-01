import React, { useEffect, useState } from 'react';
import './Page_no_1.css'; // Apne styles ke liye CSS import karein
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import AdComponent from '../Ads/AdComponent';
import axios from "axios"

const PageNo1 = () => {
    const [seconds, setSeconds] = useState(15); // Timer ke liye state
    const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Button enable/disable karne ke liye state
    const [statusMessage, setStatusMessage] = useState("Your Link Scanning..."); // Status message ke liye state
    const [linkButtonClicked, setLinkButtonClicked] = useState(false); // Track whether "Get Link" is clicked
    const [short_data_traker, setShort_data_traker] = useState(false);
    let id = useParams().id

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/linkShort/shortURL_first_page_get?shortID=${id}`);
                if (response.data.msg !== null) {
                    setShort_data_traker(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (short_data_traker) {
            document.getElementById('page_controller').classList.remove("d-none");

            // Timer shuru karna
            const timer = setInterval(() => {
                setSeconds(prev => {
                    if (prev > 1) {
                        return prev - 1; // Timer ko reduce karna
                    } else {
                        clearInterval(timer);
                        setIsButtonEnabled(true); // Button ko enable karna jab timer khatam ho
                        setStatusMessage("Success"); // Status message ko update karna
                        return 0; // Timer ko 0 par set karna
                    }
                });
            }, 1000);

            // Cleanup function
            return () => clearInterval(timer);
        } else {
            document.getElementById('page_controller').classList.add("d-none");
        }
    }, [short_data_traker]); // Dependency array mein short_data_traker daalna na bhoolen

    const handleGetLinkClick = () => {
        setLinkButtonClicked(true); // Mark "Get Link" as clicked
        const fetchData = async () => {
            try {
                await axios.put(`${import.meta.env.VITE_SERVER_URL}/linkShort/shortURL_first_page_first_btn_click_put`);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    };

    return (
        <div className="container-fluid" style={{ padding: '20px' }}>
            <div className="row d-flex justify-content-center">
                {/* Main Content Area */}
                <div className="col-md-8 text-start"> {/* Changed text alignment to start */}
                    <h1 className="mb-4">Web Development: A Comprehensive Overview</h1>
                    <p><strong>Introduction to Web Development</strong></p>
                    <p>Web development is the process of creating and maintaining websites and web applications. It encompasses various tasks such as web design, content development, client-side and server-side scripting, network security configuration, and e-commerce development. In today's digital landscape, web development is a crucial skill that influences how individuals and businesses interact online.</p>
                    {/* Banner Ads 300X250 */}
                    <div className='d-flex justify-content-center' data-banner-id="6037160"></div>
                    {/* Banner Ads 300X250 */}
                    <p><strong>The Importance of Web Development</strong></p>
                    <ul>
                        <li><strong>Business Growth:</strong> In an era where online presence is essential, a well-developed website can significantly impact a business's growth.</li>
                        <li><strong>User Experience (UX):</strong> Good web development focuses on providing a seamless user experience.</li>
                        <li><strong>Brand Credibility:</strong> A professional-looking website helps build trust and credibility.</li>
                        <li><strong>Global Reach:</strong> Effective web development enables companies to expand their market reach.</li>
                    </ul>
                    <div>
                        <AdComponent adKey="f2e76b1a9af84306102d9f8675c030e8" />
                        <div id="container-f2e76b1a9af84306102d9f8675c030e8"></div>
                    </div>
                    <div id='page_controller' className="text-center">
                        <nav className="top">
                            <p className='fs-4'><b>Your current step 1 / 3</b></p>
                        </nav>
                        <div id="tp-wait1">
                            <div className="tp-time">
                                <span id="countdown" style={{ fontSize: '30px', color: '#69aaff', fontWeight: 'bold' }}>
                                    Wait <span id="tp-time">{seconds}</span> s
                                </span>
                            </div>
                            <p style={{ color: isButtonEnabled ? 'green' : 'black', fontWeight: 'bold' }}>
                                {statusMessage}
                            </p>
                        </div>
                        <button
                            className="btn btn-primary mb-5 fs-5 w-100"
                            style={{ backgroundColor: '#0f146b' }}
                            onClick={handleGetLinkClick}
                            disabled={!isButtonEnabled}
                        >
                            <a style={{ textDecoration: "none", color: "white" }} href="#page1_Scroll_bottom">Get Link</a>
                        </button>
                    </div>
                    {/* Banner Ads 300X100 */}
                    <div className='d-flex justify-content-center' data-banner-id="6037162"></div>
                    {/* Banner Ads 300X100 */}
                    {/* Direct Link Ads */}
                    <div className='d-flex justify-content-center'>
                        <a className='d-flex justify-content-center w-100' href="https://zireemilsoude.net/4/8238246" target="_blank" rel="noopener noreferrer">
                            <img src="/click-here-gif-button.gif" style={{ width: "400px" }} alt="Click Here" className='mt-3' />
                        </a>
                    </div>
                    {/* Direct Link Ads */}
                    {/* Horizontal Adaptive Banner Onclicka */}
                    <div data-banner-id="6031734"></div>
                    {/* Horizontal Adaptive Banner Onclicka */}
                    <p><strong>Key Areas of Web Development</strong></p>
                    <p>Web development can be broadly categorized into three main areas:</p>
                    <ul>
                        <li><strong>Frontend Development:</strong> Everything that users see and interact with on a website.</li>
                        <li><strong>Backend Development:</strong> Focuses on the server-side of web applications.</li>
                        <li><strong>Full Stack Development:</strong> Proficient in both frontend and backend development.</li>
                    </ul>
                    {/* Banner Ads 300X100 */}
                    <div className='d-flex justify-content-center' data-banner-id="6037162"></div>
                    {/* Banner Ads 300X100 */}
                    <p><strong>Essential Technologies in Web Development</strong></p>
                    <p>1. <strong>HTML (HyperText Markup Language):</strong> Provides the structure and content of a website.</p>
                    <p>2. <strong>CSS (Cascading Style Sheets):</strong> Controls the presentation of HTML elements.</p>
                    <p>3. <strong>JavaScript:</strong> Adds interactivity to web pages.</p>
                    <p>4. <strong>Backend Languages:</strong> PHP, Python, Ruby, Node.js.</p>
                    <p>5. <strong>Databases:</strong> MySQL, MongoDB.</p>
                    <p>6. <strong>Version Control Systems:</strong> Tools like Git help manage code changes.</p>

                    <p><strong>Modern Web Development Trends</strong></p>
                    <ul>
                        <li><strong>Progressive Web Apps (PWAs):</strong> Combine the best features of web and mobile applications.</li>
                        <li><strong>Responsive Design:</strong> Ensures that websites adapt to various screen sizes.</li>
                        <li><strong>Single Page Applications (SPAs):</strong> Load a single HTML page and dynamically update content.</li>
                        <li><strong>Voice Search Optimization:</strong> Optimize websites for voice queries.</li>
                        <li><strong>AI and Chatbots:</strong> Enhance user interaction by providing real-time support.</li>
                    </ul>

                    <p><strong>Best Practices in Web Development</strong></p>
                    <ul>
                        <li><strong>Focus on User Experience:</strong> A user-centered design approach.</li>
                        <li><strong>Optimize for Search Engines:</strong> Implementing SEO best practices.</li>
                        <li><strong>Implement Security Measures:</strong> Protect user data with HTTPS and secure authentication.</li>
                        <li><strong>Stay Updated:</strong> The web development landscape is constantly evolving.</li>
                        <li><strong>Write Clean Code:</strong> Clean and organized code is easier to read and maintain.</li>
                    </ul>
                    {/* Banner Ads 300X250 */}
                    <div className='d-flex justify-content-center' data-banner-id="6031720"></div>
                    {/* Banner Ads 300X250 */}
                    <p><strong>Learning Path for Aspiring Web Developers</strong></p>
                    <ol>
                        <li>Understand the Basics: Start with HTML, CSS, and JavaScript.</li>
                        <li>Build Projects: Create personal projects or contribute to open-source projects.</li>
                        <li>Learn Version Control: Understanding Git and GitHub.</li>
                        <li>Explore Frameworks and Libraries: Familiarize yourself with popular frameworks.</li>
                        <li>Study Databases: Learn how to work with both SQL and NoSQL databases.</li>
                        <li>Stay Informed: Follow web development blogs and join online communities.</li>
                    </ol>

                    <p><strong>Frameworks and Libraries in Web Development</strong></p>
                    <p>Frameworks and libraries enhance the efficiency of web development. They provide pre-written code for common tasks, allowing developers to focus on building unique features.</p>
                    <ul>
                        <li><strong>Frontend Frameworks:</strong>
                            <ul>
                                <li><strong>React:</strong> A JavaScript library for building user interfaces, maintained by Facebook. It allows developers to create large web applications that can change data, without reloading the page.</li>
                                <li><strong>Angular:</strong> A platform for building mobile and desktop web applications, maintained by Google. Angular provides a comprehensive solution that includes a powerful template engine.</li>
                                <li><strong>Vue.js:</strong> A progressive JavaScript framework used for building user interfaces. It is designed to be incrementally adoptable, meaning you can use it to enhance existing pages.</li>
                            </ul>
                        </li>
                        <li><strong>Backend Frameworks:</strong>
                            <ul>
                                <li><strong>Express.js:</strong> A fast, unopinionated, minimalist web framework for Node.js, designed for building web applications and APIs.</li>
                                <li><strong>Django:</strong> A high-level Python Web framework that encourages rapid development and clean, pragmatic design. It’s widely used for developing complex web applications.</li>
                                <li><strong>Ruby on Rails:</strong> A server-side web application framework written in Ruby. It emphasizes convention over configuration, making it faster to get started with web applications.</li>
                            </ul>
                        </li>
                    </ul>
                    {/* Banner Ads 300X100 */}
                    <div className='d-flex justify-content-center' data-banner-id="6031741"></div>
                    {/* Banner Ads 300X100 */}
                    <p><strong>Common Web Development Tools</strong></p>
                    <p>Developers use various tools to streamline their workflow:</p>
                    <ul>
                        <li><strong>Code Editors:</strong> VS Code, Sublime Text, and Atom are popular code editors that offer syntax highlighting and debugging tools.</li>
                        <li><strong>Browser Developer Tools:</strong> Chrome DevTools and Firefox Developer Edition allow developers to inspect and debug code in real-time.</li>
                        <li><strong>Build Tools:</strong> Tools like Webpack and Gulp automate tasks like minification and compilation.</li>
                        <li><strong>Testing Tools:</strong> Frameworks such as Jest and Mocha help in writing tests for JavaScript applications.</li>
                    </ul>
                    <div id='ads_component_div'>
                        <AdComponent adKey="f2e76b1a9af84306102d9f8675c030e8" />
                        <div id="container-f2e76b1a9af84306102d9f8675c030e8"></div>
                    </div>

                    <p><strong>Challenges in Web Development</strong></p>
                    <p>Web development comes with its own set of challenges, including:</p>
                    <ul>
                        <li><strong>Cross-Browser Compatibility:</strong> Ensuring that a website works across different browsers.</li>
                        <li><strong>Security Threats:</strong> Protecting applications from attacks such as SQL injection and XSS.</li>
                        <li><strong>Performance Optimization:</strong> Ensuring fast loading times and a smooth user experience.</li>
                    </ul>
                    {/* Banner Ads 300X250 */}
                    <div className='d-flex justify-content-center' data-banner-id="6031719"></div>
                    {/* Banner Ads 300X250 */}
                    <p><strong>Future of Web Development</strong></p>
                    <p>As technology evolves, web development will continue to grow. Some trends that are likely to shape the future include:</p>
                    <ul>
                        <li><strong>Serverless Architecture:</strong> Reducing server management burdens by using cloud services.</li>
                        <li><strong>API-First Development:</strong> Building applications around APIs for greater flexibility.</li>
                        <li><strong>Artificial Intelligence:</strong> Leveraging AI to enhance user experiences and personalize content.</li>
                    </ul>

                    <p><strong>Conclusion</strong></p>
                    <p>Web development is an ever-evolving field that plays a crucial role in our digital lives. Whether you are looking to build a personal blog or a complex web application, understanding the fundamentals of web development is essential. By staying updated with the latest technologies and trends, you can ensure that your skills remain relevant in this dynamic industry.</p>
                </div>
            </div>

            {/* Banner Ads 300X250 */}
            <div className='d-flex justify-content-center' data-banner-id="6037160"></div>
            {/* Banner Ads 300X250 */}
            {/* Conditionally render the "Click here to continue" button */}
            {linkButtonClicked && (
                <div className='text-center d-none d-md-block'>
                    <a
                        href={`/2/${id}`}
                        className="btn btn-primary text-center mt-5 fs-5 w-100"
                        style={{ backgroundColor: '#0f146b' }}
                    >
                        Click here to continue
                    </a>
                </div>
            )}
            {/* Conditionally render the "Click here to continue" button */}
            {/* Banner Ads 300X600 */}
            <div id='page1_Scroll_bottom' className='d-flex justify-content-center align-items-center flex-wrap'>
                <div data-banner-id="6038543"></div>
                {/* Direct Link Ads */}
                <div className='d-flex justify-content-center'>
                    <a className='d-flex justify-content-center align-items-center flex-column w-100' href="https://zireemilsoude.net/4/8238196" target="_blank" rel="noopener noreferrer">
                        <img src="/click-here.gif" style={{ width: "170px" }} alt="Click Here" />
                        <img src="/download-now.gif" style={{ width: "400px" }} alt="Download Now" className='mb-5' />
                    </a>
                </div>

                {/* Direct Link Ads */}
                {/* Conditionally render the "Click here to continue" button */}
                {linkButtonClicked && (
                    <div className='text-center d-md-none'>
                        <a
                            href={`/2/${id}`}
                            className="btn btn-primary text-center mt-5 fs-5 w-100"
                            style={{ backgroundColor: '#0f146b' }}
                        >
                            Click here to continue
                        </a>
                    </div>
                )}
                {/* Conditionally render the "Click here to continue" button */}
                <div data-banner-id="6038539"></div>
            </div>
            {/* Banner Ads 300X600 */}
        </div>
    );
}

export default PageNo1;
