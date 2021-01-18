import { Component } from "react";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import { login } from "../api/methods/auth";
import { handleAxiosError } from "../tools";
import styles from "../styles/LoginPage.module.css";
import { login as localLogin } from "../actions/auth";
import { randomUnsplashImage } from "../api/methods/public";

const Logo = dynamic(() => import("../assets/mediaLogo"));
const Button = dynamic(() => import("../components/Forms/Button"));
const Loader = dynamic(() => import("../components/Forms/SFLoader"));
const NextSeo = dynamic(() => import("next-seo").then((m) => m.NextSeo));
const Input = dynamic(() => import("@rebass/forms").then((mod) => mod.Input));
const Label = dynamic(() => import("@rebass/forms").then((mod) => mod.Label));

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      password: "",
      error: {
        email: false,
        password: false,
        emailMessage: "none",
        passwordMessage: "none",
      },
      loading: false,
      loader: "loading",
    };
    this.startLogin = this.startLogin.bind(this);
    this.loginFailed = this.loginFailed.bind(this);
    this.loginSuccess = this.loginSuccess.bind(this);
    this.validateForms = this.validateForms.bind(this);
  }

  validateForms(){
    const { identifier, password } = this.state;
    let error = {
      email: false,
      password: false,
      emailMessage: "none",
      passwordMessage: "none",
    };

    if (identifier.length === 0) {
      error = {
        ...error,
        email: true,
        emailMessage: "email не заполнен",
      };
    }

    if (password.length === 0) {
      error = {
        ...error,
        password: true,
        passwordMessage: "пароль не заполнен",
      };
    }
    return error
  }

  loginSuccess(to){
    const { router } = this.props;
    this.setState({ loader: "success" });
    setTimeout(
      () => router.push(to),
      2500
    );
  }

  loginFailed(reason){
    this.setState({ loader: "fail" });
    setTimeout(() => {
      handleAxiosError(reason, {
        server_response: ({ data, status }) => {
          console.log("Sign in invalid ->", data);
          this.setState({
            loading: false,
            loader: "loading",
            error: {
              ...this.state.error,
              email: true,
              password: true,
              emailMessage: "пароль или email не верны",
              passwordMessage: "",
            },
          });
        },
        server_no_response: ({ request }) => {
          console.log("Backend no response ->", request);
          this.setState({
            loading: false,
            loader: "loading",
            error: {
              ...this.state.error,
              emailMessage: "что не так с сервером регистрации",
              passwordMessage: "",
            },
          });
        },
        request_triggered_error: ({ message }) => {
          console.log("Client error ->", message);
          this.setState({
            loading: false,
            loader: "loading",
            error: {
              ...this.state.error,
              emailMessage: "что не так с запросом входа",
              passwordMessage: "",
            },
          });
        },
      });
    }, 2500);
  }

  startLogin() {
    const { identifier, password } = this.state;
    const { router, dispatch } = this.props;
    const { query: { redirectTo } = {} } = router;
    const error = this.validateForms();

    if (error.password || error.email) this.setState({ error });
    else {
      this.setState({ loading: true });
      if (redirectTo !== undefined) {
        // login by axios and redirect
        login(identifier, password)
          .then(({ data }) => {
            this.loginSuccess(`${redirectTo}?jwt=${data.jwt}`);
          })
          .catch((reason) => {
            this.loginFailed(reason);
          });
      }
      else {
        // login by redux
        dispatch(localLogin(identifier, password)).then(() => {
          if (this.props.isLoggedIn) {
            this.loginSuccess(`/`);
          } else {
            this.loginFailed(this.props.signError);
          }
        });
      }
    }
  }

  render() {
    const {
      isLoggedIn,
      router: { query },
    } = this.props;
    const { redirectTo } = query || {};
    const { error, loading, loader } = this.state;

    return (
      <>
        <NextSeo title="Вход" />
        <div className={styles.pageRoot}>
          <img
            src={randomUnsplashImage("newspaper")}
            alt={"login page cover"}
            className={styles.cover}
          />
          <div className={styles.rightSide}>
            <Logo className={styles.logo} />
            <div className={styles.subtitle}>
              {isLoggedIn && !loading && !redirectTo ? (
                <>
                  Вы уже залогинились,
                  <br />
                  вернуться на <a href="/">главную</a>?
                </>
              ) : (
                <>
                  Присоединись первым
                  <br />к обновлённому журналу
                </>
              )}
            </div>

            {loading || (isLoggedIn && !loading && !redirectTo) ? (
              <Loader className={styles.loginButton}
                type={isLoggedIn && !loading && !redirectTo ? "success" : loader}
                style={{
                  height: "80px",
                  width: "80px",
                }}
              />
            ) : (
              <>
                <Label htmlFor="email" className={styles.inputError} sx={{ opacity: error.email ? 1 : 0 }}>
                  {error.emailMessage}
                </Label>
                <Input
                  className={styles.input}
                  sx={{borderColor: error.email ? "var(--primary)" : undefined}}
                  onChange={(e) =>
                    this.setState({
                      identifier: e.target.value,
                      error: {
                        ...this.state.error,
                        email: false,
                        emailMessage: "none",
                      },
                    })
                  }
                  id="email"
                  type="email"
                  placeholder="email"
                />

                <Label htmlFor="password" className={styles.inputError} sx={{ opacity: error.password ? 1 : 0 }}>
                  {error.passwordMessage}
                </Label>
                <Input sx={{borderColor: error.password ? "var(--primary)" : undefined}}
                  className={styles.input}
                  onChange={(e) =>
                    this.setState({
                      password: e.target.value,
                      error: {
                        ...this.state.error,
                        password: false,
                        passwordMessage: "none",
                      },
                    })
                  }
                  id="password"
                  type="password"
                  placeholder="пароль"
                />
                <div className={styles.botLinks}>
                  <a href={"/forgot-password"} target="_blank" style={{ marginLeft: "auto" }}>
                    Забыли пароль?
                  </a>
                </div>
                <Button type={"Normal"} className={styles.loginButton} onClick={this.startLogin}>
                  Войти
                </Button>
                <div className={styles.botLinks}>
                  <a href={"/register"} target="_blank" style={{ margin: "0 auto" }}>
                    Создать аккаунт
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    signError: state.auth.signError,
  };
}

export default connect(mapStateToProps)(withRouter(LoginPage));
