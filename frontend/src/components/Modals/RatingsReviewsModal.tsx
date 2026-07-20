'use client';

import { useState } from 'react';
import { useRideStore } from '@/store/useRideStore';
import { useToastStore } from '@/store/useToastStore';
import { X, Star, ThumbsUp, ShieldCheck, Check } from 'lucide-react';

export default function RatingsReviewsModal() {
  const { isReviewModalOpen, setIsReviewModalOpen, selectedRide } = useRideStore();
  const { addToast } = useToastStore();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('Great ride! Very punctual and clean car.');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Punctual', 'Safe Driver', 'Clean Car']);

  if (!isReviewModalOpen || !selectedRide) return null;

  const availableTags = ['Punctual', 'Safe Driver', 'Clean Car', 'Great Music', 'AC Always On', 'Polite & Friendly'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Review & Rating Submitted ⭐',
      message: `Thank you! Your feedback for ${selectedRide.driverName} has been recorded.`
    });
    setIsReviewModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 no-scrollbar">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Community Review
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">Rate Driver Experience</h2>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(false)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitReview} className="p-6 space-y-6">
          
          {/* Driver Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
            <img src={selectedRide.driverAvatar} alt="" className="w-12 h-12 rounded-2xl object-cover" />
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">{selectedRide.driverName}</h3>
              <p className="text-xs text-slate-500 font-medium">
                {selectedRide.vehicle.make} {selectedRide.vehicle.model} ({selectedRide.vehicle.licensePlate})
              </p>
            </div>
          </div>

          {/* Star Selection */}
          <div className="text-center space-y-2">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">How was your journey?</label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-600 block">{rating} out of 5 Stars</span>
          </div>

          {/* Tag Badges */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Select Highlights</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 ${
                    selectedTags.includes(tag)
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {selectedTags.includes(tag) && <Check className="w-3.5 h-3.5" />}
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Feedback & Comments</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold shadow-card-hover hover:scale-105 transition-all"
            >
              Submit Review
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
