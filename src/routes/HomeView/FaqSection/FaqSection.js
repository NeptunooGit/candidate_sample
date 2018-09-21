import './FaqSection.css'

import classNames from 'classnames'
import concat from 'ramda/src/concat'
import isNil from 'ramda/src/isNil'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

import Arrow from '../../../shared/icons/Arrow'
import Button from '../../../shared/components/Button/Button'
import { isEnterOrSpaceBarKey } from '../../../shared/utils/keyboard'
import Minus from '../../../shared/icons/Minus'
import Plus from '../../../shared/icons/Plus'
import { tabIndex } from '../../../shared/utils/tabNavigation'
import { trackFormEvent } from '../../../shared/utils/event'

const componentDidMount = ({ props }) => props.setAccordianIndex(0)
const componentWillUnmount = ({ props }) => props.setAccordianIndex(null)

const getFaqs = phone => [
  {
    answer: <p>Medicare Parts A & B only cover 80% of the cost of hospitalization. Medicare Supplement Insurance plans help pay the remaining 20%. Some plans also provide out-of-pocket maximums to limit your overall exposure to health costs.</p>,
    question: 'What is Medicare Supplement Insurance (aka Medigap)?',
  },
  {
    answer: <p>In most states, there are 10 different Medicare Supplement Insurance plan types available, lettered A through N. State and Federal laws define the coverage each lettered plan offers. While some insurance carriers offer better customer service, the biggest difference is price.</p>,
    question: 'Are all Medicare Supplement plans the same?',
  },
  {
    answer: <p>The best time to sign up is during your 6-month Medigap open enrollment period, which starts the month you're 65 and enrolled in Medicare Part B. After that, you may not be guaranteed a policy. If you do get a policy, it may cost you more. To get started, call <a href={`tel:${phone}`} target="_blank">{phone}</a> or fill out <Link to="/form">this form</Link> to see plans near you.</p>,
    question: 'When am I eligible to sign up for a Medigap plan?',
  },
  {
    answer: <p>Our agents work with many recognized Medicare Supplement Insurance carriers. We have simplified the process of comparing Medigap plans so you can quickly compare prices and save money. To speak to a licensed insurance agent, fill out <Link to="/form">this form</Link> or call our office at <a href={`tel:${phone}`} target="_blank">{phone}</a>.</p>,
    question: 'What makes OMP.com a fast, easy way to compare Medigap plans?',
  },
]

const onButtonClick = () => {
  const opts = {
    action: 'start',
    property: {
      progress: 0,
      form: { zip: '' },
    },
  }

  trackFormEvent(opts)
}

const onKeyDown = onClick => ev => isEnterOrSpaceBarKey(ev) && onClick()

const onQuestionClick = (props, index) => () => {
  const { setAccordianIndex, accordianIndex } = props

  if (accordianIndex === index) {
    return
  }

  setAccordianIndex(index)
}

const propTypes = {
  accordianIndex: PropTypes.number,
  browser: PropTypes.object,
  phone: PropTypes.string.isRequired,
  setAccordianIndex: PropTypes.func.isRequired,
}

const render = ({ props }) => {
  const { browser, phone } = props
  const faqs = getFaqs(phone)
  const ns = concat('faq-section__')

  const button =
    <Button
      className={ns('button')}
      href="/form"
      onClick={onButtonClick}
      size="medium"
      type="normal">
      Get Started <Arrow />
    </Button>

  return (
    <div className="faq-section">
      <div className={ns('inner')}>
        <div className={ns('text')}>
          <h2>You Have Questions. <span>We've Got Answers.</span></h2>
          <p>Ask us anything. We're here to help you find the best solution for you.</p>
          {browser.greaterThan.extraLarge && button}
        </div>
        <div className={ns('faqs')}>
          {faqs.map(renderFaq(props))}
        </div>
        {!browser.greaterThan.extraLarge && button}
      </div>
    </div>
  )
}

const renderFaq = props => (faq, index) => {
  const { accordianIndex } = props
  const { question, answer } = faq
  const isActive = accordianIndex === index
  const ns = concat('faq-section__faq__')
  const innerEl = document.getElementById(ns(`inner-${index}`))
  const questionEl = document.getElementById(ns(`question-${index}`))
  const innerHeight = innerEl ? innerEl.offsetHeight : null
  const questionHeight = questionEl ? questionEl.offsetHeight : null
  const maxHeight = isActive ? innerHeight : questionHeight
  const style = !isNil(maxHeight) ? { maxHeight } : null

  const classes = classNames('faq-section__faq', {
    'faq-section__faq--active': isActive,
  })

  const faqProps = {
    className: classes,
    key: index,
    style,
  }

  const questionProps = {
    className: ns('question'),
    id: ns(`question-${index}`),
    onClick: onQuestionClick(props, index),
    onKeyDown: onKeyDown(onQuestionClick(props, index)),
    role: 'button',
    tabIndex: tabIndex(!isActive),
  }

  return (
    <div {...faqProps}>
      <div className={ns('inner')} id={ns(`inner-${index}`)}>
        <div aria-hidden={!isActive} {...questionProps}>
          <h4>{question}</h4>
          {isActive ? <Minus /> : <Plus />}
        </div>
        <div className={ns('answer')}>
          {answer}
        </div>
      </div>
    </div>
  )
}

export default stitch({
  componentDidMount,
  componentWillUnmount,
  propTypes,
  render,
})
