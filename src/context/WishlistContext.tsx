"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { IProduct } from "@/types";

interface WishlistContextType {
  wishlist: IProduct[];
  toggleWishlist: (product: IProduct) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("a1_wishlist");
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("a1_wishlist", JSON.stringify(wishlist));
      } catch {
        // ignore
      }
    }
  }, [wishlist, isLoaded]);

  const toggleWishlist = (product: IProduct) => {
    const prodId = product._id || product.id || product.slug;
    setWishlist((prev) => {
      const exists = prev.some((p) => (p._id || p.id || p.slug) === prodId);
      if (exists) {
        return prev.filter((p) => (p._id || p.id || p.slug) !== prodId);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => (p._id || p.id || p.slug) === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
