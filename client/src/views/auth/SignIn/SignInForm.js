import React from 'react'
import {
	Input, Button,
	// Checkbox, 
	FormItem, FormContainer, Alert
} from 'components/ui'
import {
	PasswordInput,
	// ActionLink 
} from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'

const validationSchema = Yup.object().shape({
	username: Yup.string().required('Please enter your user name'),
	password: Yup.string().required('Please enter your password'),
	// rememberMe: Yup.bool()
})

const SignInForm = props => {

	const {
		disableSubmit = false,
		className,
		// forgotPasswordUrl = '/forgot-password',
		// signUpUrl = '/sign-up'
	} = props

	const [message, setMessage] = useTimeOutMessage()

	const { signIn } = useAuth()

	const onSignIn = async (values, setSubmitting) => {
		const { username, password } = values
		setSubmitting(true)

		const result = await signIn({ username, password })

		if (result.status === 'failed') {
			setMessage(result.message)
		}

		setSubmitting(false)
	}

	return (
		<div className={className}>
			{message && <Alert className="mb-4" type="danger" showIcon>{message}</Alert>}
			<Formik
				initialValues={{
					username: 'admin',
					password: '123Qwe',
					// rememberMe: true
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if (!disableSubmit) {
						onSignIn(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({ touched, errors, isSubmitting }) => (
					<Form>
						<FormContainer>
							<FormItem
								label="Tên đăng nhập"
								invalid={errors.username && touched.username}
								errorMessage={errors.username}
							>
								<Field
									type="text"
									autoComplete="off"
									name="username"
									placeholder="Nhập tên đăng nhập"
									component={Input}
								/>
							</FormItem>
							<FormItem
								label="Mật khẫu"
								invalid={errors.password && touched.password}
								errorMessage={errors.password}
							>
								<Field
									autoComplete="off"
									name="password"
									placeholder="Nhập mất khẩu"
									component={PasswordInput}
								/>
							</FormItem>
							{/* <div className="flex justify-between mb-6">
								<Field className="mb-0" name="rememberMe" component={Checkbox} children="Remember Me" />
								<ActionLink to={forgotPasswordUrl}>
									Forgot Password?
								</ActionLink>
							</div> */}
							<Button block loading={isSubmitting} variant="solid" type="submit">
								{isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
							</Button>
							{/* <div className="mt-4 text-center">
								<span>Don't have an account yet? </span>
								<ActionLink to={signUpUrl}>
									Sign up
								</ActionLink>
							</div> */}
						</FormContainer>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default SignInForm