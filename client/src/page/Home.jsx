import React, { useEffect, useState } from 'react';

import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#90ee90] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if(response.ok) {
        const result = await response.json();

        setAllPosts(result.data.reverse());
      }

    } catch (error) {
      alert(error);
    } finally {
      setLoading(false)
    }
   }
   fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#90EE90] text-[32px]">Join the festivities with Cryptknow Community and experience a one-of-a-kind celebration! </h1>
        <p className="mt-2 text-[#90EE90] text-[14px] ">Explore the Cryptknow community and unlock your full creative potential. Immerse yourself in our vibrant gallery of visually stunning images, all created with the help of advanced AI technology. Join us to discover the endless possibilities of AI and be inspired by the limitless potential of your own imagination.</p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#90EE90] text-xl mb-3">
                The genie has unearthed: <span className="text-[#90ee90]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title={<span style={{fontSize: "24px", color: "#90ee90", whiteSpace: "nowrap"}}>The genie's magic did not reveal any results</span>}
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title={<span style={{fontSize: "24px", color: "#90ee90", whiteSpace: "nowrap"}}>No Posts Yet</span>}
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;