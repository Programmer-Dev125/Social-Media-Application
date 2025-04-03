export default function Posts({ signIn, posts, bio }) {
  return (
    <>
      {signIn ? (
        posts.length === 0 ? (
          <div className="card p10 text-center">
            <p>No Posts! Create new Posts</p>
          </div>
        ) : (
          posts.map((item) => {
            return (
              <div key={item.id} className="card pt30 post-content">
                <div className="flex-box-col g30">
                  <div className="flex-box-row sp-between align-center w95 mauto">
                    <div className="w10">
                      <img
                        src={item.name === bio.name ? bio.img : item.img}
                        alt="Post Create Image"
                        className="post-creator-image"
                      />
                    </div>
                    <div className="post-info w88">
                      <p className="title mt0 mb0">{item.name}</p>
                      <p className="text-sec mt10 mb0">
                        {new Date(item.date).toDateString()}
                      </p>
                    </div>
                  </div>
                  {item.posts.length === 0 ? (
                    <p className="w100 mt0 mb20 text-center page-title">
                      No Post To Show
                    </p>
                  ) : (
                    item.posts.map((post) => {
                      return (
                        <section key={post.id}>
                          <div className="w95 mauto">
                            <p className="text ln2">{post.postTitle}</p>
                          </div>
                          <div>
                            <img
                              src={post.postImage}
                              alt="Post Image"
                              className="post-card-img"
                            />
                          </div>
                        </section>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })
        )
      ) : (
        <div className="card p10 text-center">
          <p>Login First!</p>
        </div>
      )}
    </>
  );
}
