export default function Posts({ signIn, posts, bio }) {
  return (
    <>
      {signIn ? (
        posts.map((post) =>
          post.posts.length === 0
            ? ""
            : post.posts.map((item) => (
                <section key={item.id} className="card post-content">
                  <div className="flex-box-row align-center w95 mauto mb30 mt30">
                    <div className="w10">
                      <img
                        src={bio.name === post.name ? bio.img : post.img}
                        alt="An Image"
                        className="post-creator-image"
                      />
                    </div>
                    <div className="post-info w88">
                      <p className="title mt0 mb0">{post.name}</p>
                      <p className="text-sec mt10 mb0">
                        {new Date(post.date).toDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="w95 mauto">
                    <p className="text ln2">{item.postTitle}</p>
                  </div>
                  <div>
                    <img
                      src={item.postImage}
                      alt="Post Image"
                      className="post-card-img"
                    />
                  </div>
                </section>
              ))
        )
      ) : (
        <h2 className="mt0 mb0 text-center">Login First</h2>
      )}
    </>
  );
}
