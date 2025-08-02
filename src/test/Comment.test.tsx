import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Comment from '../components/Comment';
import '@testing-library/jest-dom';

jest.mock('../context/data.json', () => ({
  currentUser: {
    username: 'juliusomo',
    image: { png: '/images/avatars/image-juliusomo.png' },
  },
  comments: [
    {
      id: 1,
      content: 'Test comment',
      createdAt: '1 day ago',
      score: 5,
      user: {
        username: 'amyrobson',
        image: { png: '/images/avatars/image-amyrobson.png' },
      },
      replies: [
        {
          id: 2,
          content: 'Test reply',
          createdAt: '2 hours ago',
          score: 2,
          replyingTo: 'amyrobson',
          user: {
            username: 'juliusomo',
            image: { png: '/images/avatars/image-juliusomo.png' },
          },
        },
      ],
    },
  ],
}));

describe('Comment Component Integration Tests', () => {
  beforeEach(() => {
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));
  });

  test('renders a comment and its reply', () => {
    render(<Comment />);
    expect(screen.getByText('Test comment')).toBeInTheDocument();
    expect(screen.getByText('Test reply')).toBeInTheDocument();
  });

  test('opens reply form when reply button is clicked', () => {
    render(<Comment />);
    fireEvent.click(screen.getAllByText('Reply')[0]);
    expect(screen.getByPlaceholderText('Write your reply...')).toBeInTheDocument();
  });

  test('opens delete modal on clicking delete', () => {
    render(<Comment />);
    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(screen.getByText('Delete Comment')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this comment? This action cannot be undone.')).toBeInTheDocument();
  });

  test('edits and saves a reply', () => {
    render(<Comment />);
    fireEvent.click(screen.getAllByText('Edit')[0]);
    const textarea = screen.getByDisplayValue('Test reply');
    fireEvent.change(textarea, { target: { value: 'Updated reply' } });
    fireEvent.click(screen.getByText('Save'));
    expect(screen.queryByDisplayValue('Updated reply')).not.toBeInTheDocument();
  });

  test('shows mobile-only delete/edit buttons', () => {
    render(<Comment />);
    expect(screen.getAllByText('Delete')[0]).toBeVisible();
    expect(screen.getAllByText('Edit')[0]).toBeVisible();
  });
});
