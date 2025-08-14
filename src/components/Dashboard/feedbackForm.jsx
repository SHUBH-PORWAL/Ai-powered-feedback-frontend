import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../UI/button'

const FeedbackForm = ({ onSubmit, loading }) => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()
  const userInput = watch('user_input', '')

  const handleFormSubmit = (data) => {
    onSubmit(data.user_input)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label 
          htmlFor="user_input" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Response
        </label>
        <textarea
          id="user_input"
          rows={6}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
            errors.user_input ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter your response here to get AI feedback..."
          {...register('user_input', {
            required: 'Please enter your response',
            minLength: {
              value: 1,
              message: 'Response cannot be empty'
            },
            maxLength: {
              value: 2000,
              message: 'Response cannot exceed 2000 characters'
            }
          })}
        />
        
        <div className="mt-1 flex justify-between text-sm">
          <div>
            {errors.user_input && (
              <span className="text-red-600">{errors.user_input.message}</span>
            )}
          </div>
          <div className="text-gray-500">
            {userInput.length}/2000 characters
          </div>
        </div>
      </div>

      <Button
        type="submit"
        loading={loading}
        disabled={!userInput.trim()}
        className="w-full sm:w-auto"
      >
        Get Feedback
      </Button>
    </form>
  )
}

export default FeedbackForm