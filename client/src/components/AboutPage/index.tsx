import imgPath from '../../../assets/login-screen-image.jpg';

const AboutPage = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-app_primary_dark mb-4">
          About Spice Station
        </h1>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              className="w-full h-auto object-cover max-h-96 mb-4"
              src={imgPath}
              alt="Spice Station Logo"
            />
          </div>

          <div className="md:w-1/2 md:pl-8">
            <p className="text-lg mb-4">
              Spice Station is a food delivery app offering best-in-class
              services in over 30 countries, with a wide variety of food items
              available.
            </p>
            <p className="text-lg mb-4">
              Our journey began 7 years ago with a simple idea: to make it
              easier for people to enjoy delicious meals from their favorite
              local restaurants in the comfort of their homes. What started as a
              small startup has now grown into a global platform serving
              millions of customers.
            </p>
            <p className="text-lg">
              We take pride in partnering with top restaurants and ensuring that
              our customers have access to an extensive menu of cuisines,
              ranging from traditional to exotic.
            </p>
            <p className="text-lg mb-4">
              With our user-friendly app and reliable delivery service, we
              strive to provide a convenient and enjoyable experience for food
              lovers everywhere.
            </p>
            <p className="text-lg">
              At Spice Station, we are committed to quality and customer
              satisfaction. We continuously work on improving our services and
              expanding our reach to bring the best dining options to your
              doorstep.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <hr />
          <h2 className="text-2xl font-bold mb-4 text-app_primary_dark mt-4">
            Our Mission
          </h2>
          <p className="text-lg">
            At Spice Station, our mission is to connect people with the joy of
            good food. We strive to provide a seamless and delightful food
            ordering experience, making it convenient for our customers to
            explore diverse culinary options and satisfy their cravings.
          </p>
        </div>

        <div className="mt-8">
          <hr />
          <h2 className="text-2xl font-bold mb-4 text-app_primary_dark mt-4">
            Our Team
          </h2>
          <p className="text-lg">
            Our success wouldn't be possible without our dedicated team of food
            enthusiasts, tech experts, and customer support professionals. We
            work tirelessly to ensure that every order is delivered with care
            and that our customers are satisfied with their experience.
          </p>
        </div>

        <div className="mt-8">
          <hr />
          <h2 className="text-2xl font-bold mb-4 text-app_primary_dark mt-4">
            Contact Us
          </h2>
          <p className="text-lg">
            We'd love to hear from you! If you have any questions, feedback, or
            partnership inquiries, please reach out to our team at{' '}
            <a href="mailto:info@spicestation.com" className="text-blue-500">
              info@spicestation.com
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
