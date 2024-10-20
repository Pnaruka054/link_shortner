import React, { useEffect, useState } from 'react';
import './Page_no_2.css';
import { Link, useParams } from 'react-router-dom';
import AdComponent from "../Ads/AdComponent"
import axios from "axios"

const PageNo2 = () => {
    const [seconds1, setSeconds1] = useState(15); // Timer ke liye state
    const [seconds2, setSeconds2] = useState(15); // Timer ke liye state
    const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Button enable/disable karne ke liye state
    const [statusMessage, setStatusMessage] = useState("Your Link Scanning..."); // Status message ke liye state
    const [linkButtonClicked1, setLinkButtonClicked1] = useState(false); // Track whether "Get Link" is clicked
    const [linkButtonClicked2, setLinkButtonClicked2] = useState(false); // Track whether "Get Link" is clicked
    const [Buttonmsg, setButtonmsg] = useState("Your Link Scanning..."); // Track whether "Get Link" is clicked
    const [short_data_tracker, setShort_data_tracker] = useState(false);

    let id = useParams().id

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/linkShort/shortURL_first_page_get?shortID=${id}`);
                if (response.data.msg !== null) {
                    setShort_data_tracker(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        document.getElementById('page_controller').classList.remove("d-none");
        if (short_data_tracker) {
            const timer = setInterval(() => {
                setSeconds1(prev => {
                    if (prev > 1) {
                        return prev - 1;
                    } else {
                        clearInterval(timer);
                        setStatusMessage(<p className='fs-5 text-danger'>👇 Scroll Down And Click Next 👇</p>);
                        setLinkButtonClicked1(true);
                        return 0;
                    }
                });
            }, 1000);

            return () => clearInterval(timer);
        } else {
            document.getElementById('page_controller').classList.add("d-none");
        }
    }, [short_data_tracker]);

    useEffect(() => {
        // Timer shuru karna
        const timer = setInterval(() => {
            if (linkButtonClicked1) {
                setSeconds2(prev => {
                    if (prev > 1) {
                        return prev - 1; // Timer ko reduce karna
                    } else {
                        clearInterval(timer);
                        setButtonmsg("Success"); // Status message ko update karna
                        setIsButtonEnabled(true);
                        return 0; // Timer ko 0 par set karna
                    }
                })
            }
        }, 1000);

        // Cleanup function
        return () => clearInterval(timer);
    }, [linkButtonClicked1]);

    const handleGetLinkClick = (e) => {
        setLinkButtonClicked2(true)
        const fetchData = async () => {
            try {
                await axios.put(`${import.meta.env.VITE_SERVER_URL}/linkShort/shortURL_secound_page_first_btn_click_put`);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    };

    return (
        <div className="text-start container">
            <h1>The Comprehensive Guide to Digital Marketing</h1>
            <hr />
            <h2>Introduction to Digital Marketing</h2>
            <p>Digital marketing refers to the promotion of products or services through digital channels to reach consumers. This form of marketing utilizes the internet and online-based digital technologies such as desktop computers, mobile phones, and other digital media platforms. As businesses increasingly turn to digital marketing, it has become an essential aspect of any marketing strategy.</p>

            <p>One of the key benefits of digital marketing is its ability to reach a global audience. Unlike traditional marketing methods, which may have geographical limitations, digital marketing can reach consumers all around the world. This is particularly advantageous for small businesses that may not have the resources to engage in large-scale advertising campaigns.</p>

            <p>Another significant advantage is the cost-effectiveness of digital marketing. Many digital marketing strategies, such as social media marketing and content marketing, can be implemented at a relatively low cost compared to traditional advertising. This allows businesses of all sizes to compete in the digital marketplace without a substantial financial investment.</p>
            <div>
                <AdComponent adKey="f2e76b1a9af84306102d9f8675c030e8" />
                <div id="container-f2e76b1a9af84306102d9f8675c030e8"></div>
            </div>

            <div id='page_controller' className="text-center">
                <nav className="top">
                    <p className='fs-4'><b>Your current step 2 / 3</b></p>
                </nav>
                <div id="tp-wait1">
                    <div className="tp-time">
                        <span id="countdown" style={{ fontSize: '30px', color: '#69aaff', fontWeight: 'bold' }}>
                            Wait <span id="tp-time">{seconds1}</span> s
                        </span>
                    </div>
                    <p style={{ color: isButtonEnabled ? 'green' : 'black', fontWeight: 'bold' }}>
                        {statusMessage}
                    </p>
                </div>
            </div>
            {/* Banner Ads 300X100 */}
            <div className='d-flex justify-content-center' data-banner-id="6037162"></div>
            {/* Banner Ads 300X100 */}
            {/* Direct Link Ads */}
            <div className='d-flex justify-content-center'>
                <a className='d-flex justify-content-center w-100' href="https://bycarver.com/nnwrv5ztgk?key=115124ac92e9fd26b74eabc48c298b1b" target="_blank" rel="noopener noreferrer">
                    <img src="/click-here-gif-button.gif" style={{ width: "400px" }} alt="Click Here" className='mt-3' />
                </a>
            </div>
            {/* Direct Link Ads */}
            <p>Digital marketing encompasses various tactics, including:</p>
            <ul>
                <li><strong>Search Engine Optimization (SEO):</strong> The process of optimizing a website to rank higher in search engine results, thereby increasing organic traffic.</li>
                <li><strong>Content Marketing:</strong> Creating and distributing valuable content to attract and engage a target audience.</li>
                <li><strong>Social Media Marketing:</strong> Utilizing social media platforms to promote products, engage with customers, and build brand awareness.</li>
                <li><strong>Email Marketing:</strong> Sending targeted emails to potential and existing customers to promote products or services.</li>
                <li><strong>PPC Advertising:</strong> Pay-per-click advertising allows businesses to display ads on search engines and pay only when someone clicks on the ad.</li>
            </ul>

            <p>As technology continues to evolve, digital marketing strategies must adapt to new trends and consumer behaviors. This includes the rise of mobile marketing, where businesses target consumers on their smartphones and tablets, as well as the growing importance of data analytics in understanding customer preferences and behaviors.</p>
            <p>In conclusion, digital marketing is a crucial component of modern business strategies. It offers a cost-effective and far-reaching way to engage with consumers and promote products or services. As the digital landscape continues to evolve, staying updated with the latest trends and technologies will be essential for businesses looking to thrive in the competitive market.</p>

            <h2>The Importance of SEO in Digital Marketing</h2>
            <p>Search Engine Optimization (SEO) is a fundamental component of digital marketing. It involves optimizing a website to improve its visibility on search engine results pages (SERPs). The higher a site ranks, the more likely it is to attract organic traffic, which can lead to increased brand awareness, engagement, and conversions.</p>
            {/* Banner Ads 300X250 */}
            <div className='d-flex justify-content-center' data-banner-id="6031720"></div>
            {/* Banner Ads 300X250 */}
            <p>One of the primary reasons SEO is crucial for digital marketing is that it enhances the user experience. When a website is optimized for search engines, it often leads to a better overall experience for users. This includes faster loading times, mobile-friendly designs, and relevant content that meets user needs. A well-optimized site not only satisfies search engine algorithms but also addresses user expectations, ultimately leading to higher satisfaction and retention rates.</p>

            <p>Moreover, SEO is cost-effective. Unlike paid advertising, where businesses must continually invest to maintain visibility, the benefits of SEO can be long-lasting. Once a website achieves a high ranking, it can continue to attract traffic without the need for ongoing payments. This makes SEO a valuable investment for businesses looking to grow their online presence.</p>

            <p>Key elements of effective SEO include:</p>
            <ul>
                <li><strong>Keyword Research:</strong> Identifying and targeting the right keywords that potential customers are searching for.</li>
                <li><strong>On-Page Optimization:</strong> Enhancing individual web pages to rank higher and earn more relevant traffic, including optimizing content, meta tags, and internal links.</li>
                <li><strong>Off-Page Optimization:</strong> Building backlinks and establishing authority through various online platforms and social media.</li>
                <li><strong>Technical SEO:</strong> Ensuring that a website meets the technical requirements of search engines, such as mobile-friendliness, secure connections (HTTPS), and a clear site architecture.</li>
            </ul>
            {/* Horizontal Adaptive Banner Onclicka */}
            <div data-banner-id="6031734"></div>
            {/* Horizontal Adaptive Banner Onclicka */}
            {linkButtonClicked1 && <div className="text-center" id='#page2_Scroll_bottom1'>
                <div id="tp-wait1">
                    <div className="tp-time">
                        <span id="countdown" style={{ fontSize: '30px', color: '#69aaff', fontWeight: 'bold' }}>
                            Wait <span id="tp-time">{seconds2}</span> s
                        </span>
                    </div>
                    <p style={{ color: isButtonEnabled ? 'green' : 'black', fontWeight: 'bold' }}>
                        {Buttonmsg}
                    </p>
                </div>
                <button
                    className="btn btn-primary mb-5 fs-5 w-100"
                    style={{ backgroundColor: '#0f146b' }}
                    onClick={handleGetLinkClick}
                    disabled={!isButtonEnabled}
                >
                    <a style={{ textDecoration: "none", color: "white" }} href="#page1_Scroll_bottom">Next</a>
                </button>
            </div>}
            {/* Direct Link Ads */}
            <div className='d-flex justify-content-center'>
                <a className='d-flex justify-content-center align-items-center flex-column w-100' href="https://bycarver.com/q5jtvigi?key=6ce245352a591a2584abf7a89393e668" target="_blank" rel="noopener noreferrer">
                    <img src="/click-here.gif" style={{ width: "170px" }} alt="Click Here" />
                    <img src="/click-here-gif-button.gif" style={{ width: "400px" }} alt="Click Here" className='mb-5' />
                </a>
            </div>
            {/* Direct Link Ads */}
            <p>Analytics play a vital role in SEO. By utilizing tools like Google Analytics and Search Console, businesses can track their SEO performance and gain insights into user behavior. This data helps marketers refine their strategies, improve content, and optimize for better results. Understanding which keywords drive traffic, how users interact with the site, and where they drop off can guide continuous improvement.</p>

            <p>In the context of digital marketing, SEO is often intertwined with content marketing. Quality content that is optimized for search engines can significantly improve a site’s ranking. By providing valuable, relevant information, businesses can attract organic traffic and establish themselves as industry authorities.</p>

            <p>As voice search technology advances, SEO strategies must adapt to accommodate natural language queries. More users are utilizing voice-activated devices, which changes the way they search for information online. This means focusing on long-tail keywords and conversational phrases will be increasingly important in optimizing content for voice search.</p>
            {/* 728X90 Banner Onclicka Ads*/}
            <div data-banner-id="6031730" className='d-none d-md-block'></div>
            {/* 728X90 Banner Onclicka Ads*/}

            <p>In summary, SEO is an essential aspect of digital marketing that cannot be overlooked. Its ability to enhance user experience, provide long-lasting results, and integrate seamlessly with content marketing makes it a vital strategy for businesses aiming to thrive in the digital landscape. As algorithms evolve and new technologies emerge, staying informed and adaptable in SEO practices will be crucial for sustained success.</p>

            <p>In conclusion, a well-executed content marketing strategy is crucial for driving engagement and conversions in digital marketing. By understanding your audience, producing high-quality content, and utilizing various channels and formats, you can create a powerful impact that elevates your brand in the digital space.</p>
            {/* Banner Ads 300X100 */}
            <div className='d-flex justify-content-center' data-banner-id="6031741"></div>
            {/* Banner Ads 300X100 */}
            <h2>Social Media Marketing</h2>
            <p>Social media marketing is vital for connecting with audiences and building brand awareness. Here are effective strategies:</p>

            <p><strong>1. Choose the Right Platforms:</strong> Focus on platforms where your target audience is active, such as Instagram for visual brands and LinkedIn for B2B.</p>

            <p><strong>2. Create a Social Media Strategy:</strong> Define your goals, audience, content types, and posting frequency to align with your marketing objectives.</p>

            <p><strong>3. Develop Engaging Content:</strong> Create shareable content like images and videos. Use storytelling to emotionally connect with your audience.</p>

            <p><strong>4. Use Hashtags Wisely:</strong> Research relevant hashtags to boost visibility, but avoid overloading your posts.</p>

            <p><strong>5. Schedule Posts:</strong> Use tools like Hootsuite or Buffer to plan posts for consistent engagement.</p>

            <p><strong>6. Monitor Engagement:</strong> Track audience interactions and respond promptly to build community and loyalty.</p>

            <p><strong>7. Leverage Influencer Marketing:</strong> Collaborate with influencers to expand your reach and credibility in your niche.</p>

            <p><strong>8. Utilize Paid Advertising:</strong> Invest in targeted ads on platforms like Facebook and Instagram for broader audience reach.</p>

            <p><strong>9. Analyze Performance:</strong> Use analytics tools to monitor key metrics and refine your strategies based on data.</p>

            <p><strong>10. Stay Authentic:</strong> Be genuine in interactions and share behind-the-scenes content to build trust with your audience.</p>

            <p>In summary, effective social media marketing fosters engagement and drives conversions, enabling brands to achieve their marketing goals.</p>

            <h2>Content Marketing</h2>
            <p>Content marketing is a strategic approach focused on creating and distributing valuable, relevant content to attract and engage a clearly defined audience. The ultimate goal is to drive profitable customer action. Here’s how to effectively implement a content marketing strategy:</p>

            <p><strong>1. Define Your Audience:</strong> Understanding your target audience is critical. Develop buyer personas that detail demographics, interests, challenges, and preferences. This information will guide your content creation efforts and ensure you resonate with your audience.</p>

            <p><strong>2. Set Clear Goals:</strong> Establish specific, measurable, achievable, relevant, and time-bound (SMART) goals for your content marketing efforts. Whether it's increasing brand awareness, generating leads, or boosting sales, clear goals help measure the success of your strategy.</p>

            <p><strong>3. Create a Content Calendar:</strong> Planning is essential for consistent content delivery. Develop a content calendar that outlines topics, formats, publication dates, and distribution channels. A calendar helps you stay organized and ensures a steady flow of content.</p>


            <p><strong>4. Produce High-Quality Content:</strong> Quality over quantity is key in content marketing. Create informative, engaging, and well-researched content that provides value to your audience. Whether it’s blog posts, videos, infographics, or podcasts, focus on delivering quality content.</p>

            <p><strong>5. Optimize for SEO:</strong> Incorporate SEO best practices into your content to increase visibility on search engines. Use relevant keywords, optimize meta tags, and ensure your content is structured for readability. This helps attract organic traffic and improves your chances of ranking higher in search results.</p>

            <p>In conclusion, content marketing is a powerful tool for building brand loyalty and driving customer engagement. By delivering valuable content and fostering relationships with your audience, you can create a sustainable marketing strategy that drives long-term success.</p>

            <h2>Email Marketing Strategies</h2>
            <p>Email marketing remains one of the most effective digital marketing strategies. It allows businesses to communicate directly with their audience, build relationships, and drive conversions. Here are some key strategies to enhance your email marketing efforts:</p>
            {/* Banner Ads 300X250 */}
            <div className='d-flex justify-content-center' data-banner-id="6031719"></div>
            {/* Banner Ads 300X250 */}
            <p><strong>1. Build a Quality Email List:</strong> Focus on growing a targeted email list rather than just increasing numbers. Use sign-up forms on your website, offer incentives like discounts, or host webinars to encourage subscriptions. Ensure that you have permission to email your subscribers to comply with regulations.</p>

            <p><strong>2. Segment Your Audience:</strong> Divide your email list into segments based on demographics, purchase behavior, or engagement level. This allows for more personalized messaging, which can lead to higher open and click-through rates.</p>

            <p><strong>3. Craft Compelling Subject Lines:</strong> The subject line is the first thing recipients see, and it plays a crucial role in open rates. Make it catchy, concise, and relevant to encourage readers to open the email.</p>

            <p><strong>4. Personalize Your Content:</strong> Use your subscribers' names and tailor content to their preferences. Personalized emails resonate more with recipients, making them feel valued and increasing engagement.</p>

            <p><strong>5. Focus on Valuable Content:</strong> Your emails should provide value to your subscribers. This can include informative articles, exclusive offers, or helpful tips. The goal is to build trust and keep subscribers engaged.</p>

            <p>In summary, email marketing is a powerful tool for nurturing relationships and driving conversions. By focusing on quality content, segmentation, and personalization, businesses can create effective email campaigns that resonate with their audience.</p>

            <h2>PPC Advertising Insights</h2>
            <p>PPC (Pay-Per-Click) advertising is a digital marketing strategy that allows businesses to gain immediate visibility on search engines and social media platforms. Advertisers pay each time a user clicks on their ad, making it essential to optimize campaigns for maximum ROI. Here are some insights into effective PPC advertising:</p>

            <p><strong>1. Keyword Research:</strong> Start with thorough keyword research to identify terms and phrases that your target audience is searching for. Use tools like Google Keyword Planner to find high-traffic keywords that align with your offerings.</p>

            <p><strong>2. Create Compelling Ads:</strong> Your ad copy should be engaging and relevant to the keywords you're targeting. Highlight unique selling points, include a clear call to action, and use emotional triggers to entice users to click.</p>

            <p><strong>3. Optimize Landing Pages:</strong> Ensure that the landing pages linked to your ads are relevant and optimized for conversions. A seamless user experience and clear calls to action can significantly improve conversion rates.</p>

            <p><strong>4. Set a Budget:</strong> Determine a daily or monthly budget for your PPC campaigns. Monitor spending closely to avoid overspending and ensure you get the most value for your investment.</p>

            <p><strong>5. Utilize Ad Extensions:</strong> Take advantage of ad extensions offered by platforms like Google Ads. Extensions such as site links, callouts, and structured snippets can enhance your ads and provide additional information to users.</p>

            <p>In conclusion, PPC advertising is a valuable tool for driving immediate traffic and conversions. By focusing on keyword optimization, compelling ad creation, and continuous monitoring, businesses can achieve significant results through PPC campaigns.</p>


            <h2>Conclusion: Embracing Digital Marketing for Success</h2>
            <p>In today's fast-paced digital landscape, effective marketing strategies are crucial for businesses seeking to thrive. Digital marketing encompasses a wide range of tactics, including SEO, content marketing, social media, email marketing, and PPC advertising. Each of these elements plays a vital role in creating a cohesive marketing strategy that engages audiences and drives conversions.</p>

            <p>The benefits of digital marketing are undeniable. It allows businesses to reach a global audience, measure campaign performance in real-time, and adjust strategies based on data-driven insights. As technology continues to evolve, staying updated with the latest trends and adapting to new tools and platforms will be essential for businesses looking to maintain a competitive edge.</p>

            <p>Moreover, a customer-centric approach is paramount. Understanding your audience's needs and preferences enables businesses to create personalized experiences that foster loyalty and trust. As consumers become more discerning, providing value and building relationships through meaningful engagement will be key to long-term success.</p>

            <p>As we look to the future, digital marketing will increasingly integrate emerging technologies such as AI, AR, and voice search. Businesses that embrace these innovations and prioritize ethical practices will be well-positioned to navigate the complexities of the digital landscape.</p>

            {/* Banner Ads 300X250 */}
            <div className='d-flex justify-content-center' data-banner-id="6037160"></div>
            {/* Banner Ads 300X250 */}
            <p>In conclusion, the journey of digital marketing is ongoing, requiring continuous learning and adaptation. By leveraging the tools and strategies discussed, businesses can effectively engage with their audience, drive growth, and achieve their marketing goals. Embrace the opportunities presented by digital marketing, and watch your business flourish in the digital age.</p>
            {/* Conditionally render the "Click here to continue" button */}
            {linkButtonClicked2 && (
                <div className='text-center d-none d-md-block'>
                    <a
                        href={`/3/${id}`}
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
                    <a className='d-flex justify-content-center align-items-center flex-column w-100' href="https://bycarver.com/fhp0is9j?key=20050f2539da92b9243bbc662b5c12bf" target="_blank" rel="noopener noreferrer">
                        <img src="/click-here.gif" style={{ width: "170px" }} alt="Click Here" />
                        <img src="/download-now.gif" style={{ width: "400px" }} alt="Click Here" className='mb-5' />
                    </a>
                </div>
                {/* Direct Link Ads */}
                {/* Conditionally render the "Click here to continue" button */}
                {linkButtonClicked2 && (
                    <div className='text-center d-md-none'>
                        <a
                            href={`/3/${id}`}
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

export default PageNo2;
