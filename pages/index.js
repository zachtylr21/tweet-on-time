import { twitterClient } from "../utils/twitter-client";
import { ScheduledTweets, TweetForm } from "../components/tweets";
import { Layout, PageInfo, ProfileInfo } from "../components/lib";

export default function Home({ userData }) {
  return (
    <Layout>
      <PageInfo title="Tweet on Time" />
      <ProfileInfo userData={userData} />
      <TweetForm />
      <ScheduledTweets />
    </Layout>
  );
}

export async function getServerSideProps() {
  const result = await twitterClient.get("account/verify_credentials");
  return {
    props: {
      userData: {
        name: result.name,
        screenName: result.screen_name,
        profileImage: result.profile_image_url_https.replace(
          "normal",
          "400x400"
        ),
        description: result.description,
      },
    },
  };
}
