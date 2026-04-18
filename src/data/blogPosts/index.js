// Blog post registry — each post is in its own file for maintainability
import { post1 } from './post1';
import { post2 } from './post2';
import { post3 } from './post3';
import { post4 } from './post4';
import { post5 } from './post5';
import { post6 } from './post6';
import { post7 } from './post7';
import { post8 } from './post8';
import { post9 } from './post9';
import { post10 } from './post10';
import { post11 } from './post11';
import { post12 } from './post12';
import { post13 } from './post13';
import { post14 } from './post14';
import { post15 } from './post15';
import { post16 } from './post16';
import { post17 } from './post17';
import { post18 } from './post18';
import { post19 } from './post19';
import { post20 } from './post20';

export const blogPosts = [
    post1, post2, post3, post4, post5,
    post6, post7, post8, post9, post10,
    post11, post12, post13, post14, post15,
    post16, post17, post18, post19, post20,
];

export const getPostBySlug = (slug) => blogPosts.find(p => p.slug === slug);

export const getPostsByCategory = (category) =>
    category === 'All' ? blogPosts : blogPosts.filter(p => p.category === category);

export const getRelatedPosts = (currentSlug, limit = 3) => {
    const current = getPostBySlug(currentSlug);
    if (!current) return [];
    return blogPosts
        .filter(p => p.slug !== currentSlug)
        .filter(p => p.category === current.category || p.tags.some(t => current.tags.includes(t)))
        .slice(0, limit);
};

export const categories = ['All', 'AI Tools', 'AI Marketing', 'AI Strategy', 'AI Analytics', 'AI Content'];
