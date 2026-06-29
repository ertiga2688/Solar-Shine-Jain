import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import { useGetFeedback, getGetFeedbackQueryKey, useSubmitFeedback } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().optional(),
  rating: z.number().min(1).max(5),
  message: z.string().min(10, "Please write at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = React.useState(0);
  return (
    <div className="flex gap-1" data-testid="input-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          data-testid={`star-${star}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              star <= (hovered || value)
                ? "fill-secondary text-secondary"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function FeedbackCard({ item, isNew }: { item: { id: number; name: string; location: string | null; rating: number; message: string; createdAt: string }; isNew?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-2xl p-6 shadow-md border ${isNew ? "border-secondary/40 ring-2 ring-secondary/20" : "border-gray-100"}`}
      data-testid={`card-feedback-${item.id}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-bold text-primary text-lg" data-testid={`text-feedback-name-${item.id}`}>{item.name}</p>
          {item.location && (
            <p className="text-sm text-muted-foreground" data-testid={`text-feedback-location-${item.id}`}>{item.location}</p>
          )}
        </div>
        <div className="flex gap-0.5" data-testid={`text-feedback-rating-${item.id}`}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-4 h-4 ${s <= item.rating ? "fill-secondary text-secondary" : "text-gray-200"}`}
            />
          ))}
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed" data-testid={`text-feedback-message-${item.id}`}>{item.message}</p>
      <p className="text-xs text-muted-foreground/60 mt-4">
        {new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </p>
    </motion.div>
  );
}

export default function FeedbackPage() {
  useEffect(() => {
    document.title = "Customer Feedback | Jain Communications";
  }, []);

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [lastSeenId, setLastSeenId] = React.useState<number | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const { data: feedbackList, isLoading } = useGetFeedback({
    query: {
      queryKey: getGetFeedbackQueryKey(),
      refetchInterval: 5000,
    },
  });

  const submitFeedback = useSubmitFeedback({
    mutation: {
      onSuccess: (newItem) => {
        queryClient.invalidateQueries({ queryKey: getGetFeedbackQueryKey() });
        setLastSeenId(newItem.id);
        setSubmitted(true);
        toast({ title: "Thank you!", description: "Your feedback has been posted." });
      },
      onError: () => {
        toast({ title: "Error", description: "Could not submit feedback. Please try again.", variant: "destructive" });
      },
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", location: "", rating: 0, message: "" },
  });

  function onSubmit(values: FormValues) {
    submitFeedback.mutate({
      data: {
        name: values.name,
        location: values.location || null,
        rating: values.rating,
        message: values.message,
      },
    });
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Feedback</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Share your experience with Jain Communications. Your feedback appears on this page instantly.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Submit Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 sticky top-28">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-primary mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-6">Your feedback has been posted and is visible below.</p>
                <Button
                  variant="outline"
                  data-testid="button-submit-another"
                  onClick={() => { setSubmitted(false); form.reset(); }}
                >
                  Submit Another
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">Share Your Experience</h2>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input data-testid="input-feedback-name" placeholder="e.g. Rajinder Singh" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location (optional)</FormLabel>
                          <FormControl>
                            <Input data-testid="input-feedback-location" placeholder="e.g. Nakodar, Punjab" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating</FormLabel>
                          <FormControl>
                            <StarRating value={field.value} onChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Review</FormLabel>
                          <FormControl>
                            <Textarea
                              data-testid="input-feedback-message"
                              placeholder="Tell others about your solar installation experience..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      data-testid="button-submit-feedback"
                      disabled={submitFeedback.isPending}
                      className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base"
                    >
                      {submitFeedback.isPending ? "Posting..." : "Post Feedback"}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </div>

          {/* Live Feed */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
              </span>
              <h2 className="text-xl font-bold text-primary">Live Reviews</h2>
              {feedbackList && (
                <span className="text-sm text-muted-foreground">({feedbackList.length} total)</span>
              )}
            </div>

            {isLoading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <Skeleton className="h-5 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            )}

            {!isLoading && feedbackList && feedbackList.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <AlertCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">No reviews yet.</p>
                <p className="text-sm text-muted-foreground">Be the first to share your experience!</p>
              </div>
            )}

            {feedbackList && feedbackList.length > 0 && (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {feedbackList.map((item) => (
                    <FeedbackCard
                      key={item.id}
                      item={item}
                      isNew={item.id === lastSeenId}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
