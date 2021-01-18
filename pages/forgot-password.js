import { Component } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";

import { randomUnsplashImage } from "../api/methods/public";

const NextSeo = dynamic(() => import("next-seo").then((m) => m.NextSeo));
const Logo = dynamic(() => import("../assets/mediaLogo"));
const Button = dynamic(() => import("../components/Forms/Button"));
const Input = dynamic(() => import("@rebass/forms").then((mod) => mod.Input));
const Label = dynamic(() => import("@rebass/forms").then((mod) => mod.Label));

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      router: { query },
    } = this.props;
    const { redirectTo } = query || {};
    const { cover, error, loading } = this.state;

    return (
      <>
        <NextSeo title="Восстановление пароля" />
      </>
    );
  }
}

export default withRouter(ForgotPasswordPage);
