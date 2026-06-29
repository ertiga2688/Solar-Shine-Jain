import React, { useEffect, useState, useCallback } from "react";
import { Shield, LogOut, Phone, Mail, MapPin, Star, RefreshCw, MessageSquare, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Contact = {
  id: number; name: string; phone: string; email: string | null;
  address: string | null; message: string; type: string;
  monthlyBill: number | null; createdAt: string;
};
type FeedbackRow = {
  id: number; name: string; location: string | null;
  rating: number; message: string; createdAt: string;
};

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? "fill-secondary text-secondary" : "text-gray-200"}`} />
      ))}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    survey: "bg-blue-100 text-blue-700",
    subsidy: "bg-green-100 text-green-700",
    general: "bg-gray-100 text-gray-700",
  };
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[type] ?? colors.general}`}>{type}</span>;
}

export default function Admin() {
  useEffect(() => { document.title = "Admin | Jain Communications"; }, []);

  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("admin_token"));
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<"contacts" | "feedback">("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [feedback, setFeedback] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const fetchData = useCallback(async (tok: string) => {
    setLoading(true);
    try {
      const [cRes, fRes] = await Promise.all([
        fetch(`${BASE}/api/admin/contacts`, { headers: { Authorization: `Bearer ${tok}` } }),
        fetch(`${BASE}/api/admin/feedback`, { headers: { Authorization: `Bearer ${tok}` } }),
      ]);
      if (cRes.status === 401 || fRes.status === 401) {
        sessionStorage.removeItem("admin_token");
        setToken(null);
        setLoginError("Session expired. Please log in again.");
        return;
      }
      setContacts(await cRes.json());
      setFeedback(await fRes.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) fetchData(token);
  }, [token, fetchData]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    sessionStorage.setItem("admin_token", password);
    setToken(password);
    setPassword("");
  }

  function logout() {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setContacts([]);
    setFeedback([]);
  }

  function fmt(iso: string) {
    return new Date(iso).toLocaleString("en-IN", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  }

  if (!token) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Admin Access</h1>
              <p className="text-xs text-muted-foreground">Jain Communications</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-primary block mb-1.5">Password</label>
              <Input
                type="password"
                data-testid="input-admin-password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && <p className="text-sm text-destructive">{loginError}</p>}
            <Button type="submit" data-testid="button-admin-login" className="w-full bg-primary text-white hover:bg-primary/90 font-bold">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-primary text-white py-6 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-secondary" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-admin-refresh"
              onClick={() => fetchData(token)}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <RefreshCw className="w-4 h-4 mr-1" /> Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-admin-logout"
              onClick={logout}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{contacts.length}</div>
              <div className="text-sm text-muted-foreground font-medium">Total Inquiries</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{feedback.length}</div>
              <div className="text-sm text-muted-foreground font-medium">Total Reviews</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            data-testid="tab-contacts"
            onClick={() => setTab("contacts")}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${tab === "contacts" ? "bg-primary text-white shadow-md" : "bg-white text-muted-foreground border border-gray-200 hover:bg-gray-50"}`}
          >
            Inquiries ({contacts.length})
          </button>
          <button
            data-testid="tab-feedback"
            onClick={() => setTab("feedback")}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${tab === "feedback" ? "bg-primary text-white shadow-md" : "bg-white text-muted-foreground border border-gray-200 hover:bg-gray-50"}`}
          >
            Reviews ({feedback.length})
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-3">
            {[1,2,3].map((i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}
          </div>
        )}

        {/* Contacts Tab */}
        {!loading && tab === "contacts" && (
          <div className="space-y-3">
            {contacts.length === 0 && (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100 text-muted-foreground">
                No inquiries yet.
              </div>
            )}
            {contacts.map((c) => (
              <div key={c.id} data-testid={`card-contact-${c.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div
                  className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary text-sm">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-primary">{c.name}</span>
                        <TypeBadge type={c.type} />
                      </div>
                      <div className="text-sm text-muted-foreground truncate">{c.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-muted-foreground hidden sm:block">{fmt(c.createdAt)}</span>
                    {expanded === c.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </div>
                {expanded === c.id && (
                  <div className="border-t border-gray-100 p-5 bg-gray-50 space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4 text-secondary" />
                        <a href={`tel:+91${c.phone}`} className="hover:text-primary font-medium">{c.phone}</a>
                      </div>
                      {c.email && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-4 h-4 text-secondary" />
                          <a href={`mailto:${c.email}`} className="hover:text-primary font-medium">{c.email}</a>
                        </div>
                      )}
                      {c.address && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span>{c.address}</span>
                        </div>
                      )}
                      {c.monthlyBill && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="text-secondary font-bold text-base">₹</span>
                          <span>Monthly bill: ₹{c.monthlyBill.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <p className="text-sm font-medium text-primary mb-1">Message</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{fmt(c.createdAt)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Feedback Tab */}
        {!loading && tab === "feedback" && (
          <div className="space-y-3">
            {feedback.length === 0 && (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100 text-muted-foreground">
                No reviews yet.
              </div>
            )}
            {feedback.map((f) => (
              <div key={f.id} data-testid={`card-feedback-admin-${f.id}`} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-bold text-primary">{f.name}</span>
                    {f.location && <span className="text-sm text-muted-foreground ml-2">— {f.location}</span>}
                  </div>
                  <StarRow rating={f.rating} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.message}</p>
                <p className="text-xs text-muted-foreground/60 mt-3">{fmt(f.createdAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
