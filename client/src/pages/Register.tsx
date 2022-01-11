import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineUser, AiOutlineEye, AiOutlineMail, AiOutlineEyeInvisible, AiOutlineBank } from 'react-icons/ai';
import axios from 'axios';
import { Container, Form, Header, Body, Footer } from '@src/styles/Register.styled';
import { IFormInputType } from '@src/types/Register.type';

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const [showGuideText, setShowGuideText] = useState(false);
  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {
    const res = await axios.post('/api/register', data);
    const { status } = res.data;
    if (status === true) {
      setShowGuideText(true);
    }
  };

  const [hidePw, setHidePw] = useState(true);
  const [hideConfirmPw, setHideConfirmPw] = useState(true);

  return (
    <Container>
      {showGuideText ? (
        <div className="guide-text-wrapper">
          <div>
            <p className="guide-text-title">
              가입하신 이메일로 <span className="guide-text-email">"인증메일"</span>을 보내드렸습니다.📫
            </p>
          </div>
          <p className="guide-text-content">
            안녕하세요. 회원이 되신것을 축하합니다.🌈🌈
            <br /> 아직 한단계가 남았어요 !! 😉😉
            <br /> 가입하신 이메일에서 인증을 해주시면, 저희 서비스를 마음껏 이용하실수 있습니다.
            <br />
            <span className="guide-text-caution">
              (단, 회원가입을 하셨어도 이메일 인증을 하지 않으면 서비스를 이용하실수 없습니다.)⛔⛔
            </span>
          </p>
          <button className="guide-text-button" onClick={() => navigate('/')}>
            홈 페이지로 가기
          </button>
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Header>
            <div className="logo">회원가입</div>
          </Header>
          <Body>
            <div className="input-wrapper">
              <label className="input-label" htmlFor="email">
                이메일
              </label>
              <input
                className="input"
                type="text"
                placeholder="이메일(Tojaeung@xxx.com)"
                style={{ borderColor: errors.email && 'red' }}
                {...register('email', {
                  required: { value: true, message: '이메일 입력해주세요.' },
                  pattern: {
                    value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                    message: '이메일 형식이 아닙니다.',
                  },
                })}
              />
              {errors.email && <div className="error-message">{errors.email.message}</div>}
              <AiOutlineMail className="input-icon" />
            </div>

            <div className="input-wrapper">
              <label className="input-label" htmlFor="nickname">
                닉네임
              </label>
              <input
                className="input"
                type="text"
                placeholder="닉네임"
                style={{ borderColor: errors.nickname && 'red' }}
                {...register('nickname', {
                  required: { value: true, message: '닉네임을 입력해주세요' },
                  minLength: { value: 2, message: '최소 2글자 이상입니다.' },
                  maxLength: { value: 10, message: '최대 10글자 이하입니다.' },
                  pattern: {
                    value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
                    message: '영어,한글,숫자를 조합할 수 있습니다.',
                  },
                })}
              />
              {errors.nickname && <div className="error-message">{errors.nickname.message}</div>}
              <AiOutlineUser className="input-icon" />
            </div>

            <div className="input-wrapper">
              <label className="input-label" htmlFor="pw">
                비밀번호
              </label>
              <input
                className="input"
                type={hidePw ? 'password' : 'text'}
                placeholder="비밀번호"
                style={{ borderColor: errors.pw && 'red' }}
                {...register('pw', {
                  required: { value: true, message: '비밀번호를 입력해주세요' },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                    message: '영문,숫자.특수문자 조합하여 8자리 이상',
                  },
                })}
              />
              {errors.pw && <div className="error-message">{errors.pw.message}</div>}
              {hidePw ? (
                <AiOutlineEye className="input-icon" onClick={() => setHidePw(false)} />
              ) : (
                <AiOutlineEyeInvisible className="input-icon" onClick={() => setHidePw(true)} />
              )}
            </div>

            <div className="input-wrapper">
              <label className="input-label" htmlFor="confirmPw">
                비밀번호 확인
              </label>
              <input
                className="input"
                type={hideConfirmPw ? 'password' : 'text'}
                placeholder="비밀번호 확인"
                style={{ borderColor: errors.confirmPw && 'red' }}
                {...register('confirmPw', {
                  required: { value: true, message: '비밀번호를 확인해주세요' },
                  validate: (value) => value === watch('pw'),
                })}
              />
              {errors.confirmPw && errors.confirmPw.type === 'required' && (
                <div className="error-message">{errors.confirmPw.message}</div>
              )}
              {errors.confirmPw && errors.confirmPw.type === 'validate' && (
                <div className="error-message">비밀번호가 일치하지 않습니다.</div>
              )}
              {hideConfirmPw ? (
                <AiOutlineEye className="input-icon" onClick={() => setHideConfirmPw(false)} />
              ) : (
                <AiOutlineEyeInvisible className="input-icon" onClick={() => setHideConfirmPw(true)} />
              )}
            </div>

            <hr />

            <div className="register-guide-text">
              작가활동을 원하시는 분은 거래의 편리함을 위해
              <br /> 아래의 은행과 계좌번호를 입력해주세요. (필수X)
              <br />
            </div>

            <div className="input-wrapper">
              <label className="input-label" htmlFor="bank">
                은행
              </label>
              <select className="input" {...register('bank')}>
                <option value="">------------------------은행선택---------------------------</option>
                <option value="hyundai">현대카드</option>
                <option value="shinhan">신한카드</option>
                <option value="kookmin">국민카드</option>
                <option value="bc">BC카드</option>
                <option value="lotte">롯데카드</option>
                <option value="hana">하나카드</option>
                <option value="samsung">삼성카드</option>
                <option value="wooli">우리카드</option>
                <option value="city">씨티카드</option>
                <option value="nh">농협카드</option>
                <option value="kakao">카카오뱅크</option>
                <option value="k">케이뱅크</option>
              </select>
            </div>

            <div className="input-wrapper">
              <label className="input-label" htmlFor="accountNumber">
                계좌번호
              </label>
              <input className="input" type="text" placeholder="계좌번호" {...register('accountNumber')} />
              <AiOutlineBank className="input-icon" />
            </div>
          </Body>
          <Footer>
            <button className="submit-button" type="submit">
              회원가입
            </button>
          </Footer>
        </Form>
      )}
    </Container>
  );
}

export default Register;
