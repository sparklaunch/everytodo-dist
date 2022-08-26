import {
    SignupContainer,
    SignupForm,
    FormField,
    Logo,
    PasswordStrength,
    PasswordConfirmationLabel
} from "./styles";
import {
    TextField,
    Button,
    Tooltip,
    LinearProgress,
    Modal,
    Box,
    Typography,
    Fade
} from "@mui/material";
import { StateType } from "../../redux/modules/users";
import { useState, ChangeEvent, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/modules/users";
import { v4 as uuidV4 } from "uuid";

const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 3,
    p: 4
};

function scorePassword(password: string) {
    let score = 0;
    if (!password) {
        return score;
    }
    interface Letter {
        [key: string]: number;
    }
    let letters: Letter = {};
    for (let i = 0; i < password.length; i++) {
        letters[password[i]] = (letters[password[i]] || 0) + 1;
        score += 5.0 / letters[password[i]];
    }
    interface Variation {
        [key: string]: boolean;
    }
    const variations: Variation = {
        digits: /\d/.test(password),
        lower: /[a-z]/.test(password),
        upper: /[A-Z]/.test(password),
        nonWords: /\W/.test(password)
    };
    let variationCount = 0;
    for (const check in variations) {
        variationCount += variations[check] ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return score;
}

const Signup = () => {
    const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const users = useSelector((state: StateType) => state.users);
    const dispatch = useDispatch();
    const [open, setOpen] = useState({
        state: false,
        target: "email"
    });
    const modalMessage = useMemo(() => {
        switch (open.target) {
            case "email":
                return "이메일을 입력하세요.";
            case "password":
                return "비밀번호를 입력하세요.";
            case "mismatch":
                return "비밀번호가 일치하지 않습니다.";
            case "invalidEmail":
                return "올바른 이메일 형식이 아닙니다.";
            case "redundancy":
                return "해당 이메일이 이미 존재합니다.";
            case "okay":
                return "사용 가능한 이메일입니다.";
        }
    }, [open.target]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [passwordScore, setPasswordScore] = useState(0);
    const [passwordScoreLabel, setPasswordScoreLabel] = useState("약함");
    const [passwordConfirmationLabel, setPasswordConfirmationLabel] =
        useState("비밀번호 불일치");
    useEffect(() => {
        const score = scorePassword(password);
        setPasswordScore(Math.min(score, 100));
        if (score < 30) {
            setPasswordScoreLabel("약함");
        } else if (score < 60) {
            setPasswordScoreLabel("보통");
        } else {
            setPasswordScoreLabel("강함");
        }
    }, [password]);
    useEffect(() => {
        if (password === passwordConfirmation && password.length !== 0) {
            setPasswordConfirmationLabel("비밀번호 일치");
        } else {
            setPasswordConfirmationLabel("비밀번호 불일치");
        }
    }, [password, passwordConfirmation]);
    const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const passwordConfirmationHandler = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setPasswordConfirmation(event.target.value);
    };
    const checkRedundancy = () => {
        const isNotEmpty = Array.isArray(users) && users.length;
        if (isNotEmpty && users.find((user) => user.email === email)) {
            setOpen(() => {
                return {
                    state: true,
                    target: "redundancy"
                };
            });
        } else if (email.length === 0) {
            setOpen(() => {
                return {
                    state: true,
                    target: "email"
                };
            });
        } else if (!emailRegex.test(email)) {
            setOpen(() => {
                return {
                    state: true,
                    target: "invalidEmail"
                };
            });
        } else {
            setOpen(() => {
                return {
                    state: true,
                    target: "okay"
                };
            });
        }
    };
    const signupHandler = () => {
        if (
            email.length !== 0 &&
            password.length !== 0 &&
            password === passwordConfirmation &&
            emailRegex.test(email)
        ) {
            const newUser = {
                id: uuidV4(),
                email,
                password
            };
            dispatch(createUser(newUser));
            setEmail("");
            setPassword("");
            setPasswordConfirmation("");
        } else {
            if (email.length === 0) {
                setOpen(() => {
                    return {
                        state: true,
                        target: "email"
                    };
                });
            } else if (password.length === 0) {
                setOpen(() => {
                    return {
                        state: true,
                        target: "password"
                    };
                });
            } else if (password !== passwordConfirmation) {
                setOpen(() => {
                    return {
                        state: true,
                        target: "mismatch"
                    };
                });
            } else if (!emailRegex.test(email)) {
                setOpen(() => {
                    return {
                        state: true,
                        target: "invalidEmail"
                    };
                });
            }
        }
    };
    return (
        <SignupContainer>
            <Logo>
                <img src="/assets/Logo.png" alt="Logo" />
            </Logo>
            <SignupForm>
                <FormField>
                    <label htmlFor="email">이메일</label>
                    <TextField
                        id="email"
                        label="이메일"
                        required
                        variant="outlined"
                        value={email}
                        onChange={emailHandler}
                        sx={{ width: 300 }}
                    />
                    <Tooltip title="중복확인">
                        <Button
                            variant="contained"
                            size="large"
                            onClick={checkRedundancy}
                        >
                            중복확인
                        </Button>
                    </Tooltip>
                </FormField>
                <FormField>
                    <label htmlFor="password">비밀번호</label>
                    <TextField
                        value={password}
                        onChange={passwordHandler}
                        required
                        id="password"
                        label="비밀번호"
                        variant="outlined"
                        type="password"
                        autoComplete="current-password"
                        sx={{ width: 300 }}
                    />
                    <PasswordStrength>
                        <p>{passwordScoreLabel}</p>
                        <LinearProgress
                            variant="determinate"
                            value={passwordScore}
                            sx={{ height: 20, borderRadius: 5 }}
                        />
                    </PasswordStrength>
                </FormField>
                <FormField>
                    <label htmlFor="password-confirmation">비밀번호 확인</label>
                    <TextField
                        value={passwordConfirmation}
                        onChange={passwordConfirmationHandler}
                        required
                        id="password-confirmation"
                        label="비밀번호 확인"
                        variant="outlined"
                        type="password"
                        autoComplete="current-password"
                        sx={{ width: 300 }}
                    />
                    <PasswordConfirmationLabel>
                        <p>{passwordConfirmationLabel}</p>
                    </PasswordConfirmationLabel>
                </FormField>
            </SignupForm>
            <Button
                variant="contained"
                size="large"
                sx={{ width: 300 }}
                onClick={signupHandler}
            >
                회원가입
            </Button>
            <Modal
                open={open.state}
                onClose={() => {
                    setOpen((previousState) => {
                        return {
                            state: false,
                            target: previousState.target
                        };
                    });
                }}
                closeAfterTransition
            >
                <Fade in={open.state}>
                    <Box sx={boxStyle}>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: "center" }}
                        >
                            {modalMessage}
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </SignupContainer>
    );
};

export default Signup;
