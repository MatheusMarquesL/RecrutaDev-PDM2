import React, { createContext, useContext, useMemo, useState } from
    'react';
import { Candidate, initialCandidates } from '../data/candidates';
sessão
export const FREE_LIMIT = 3;
type CandidatesContextType = {
    candidates: Candidate[];
    deck: Candidate[];
    approvedCandidates: Candidate[];
    (Tela 2)

    approveCandidate: (id: string, priority?: boolean) => void;
    discardCandidate: (id: string) => void;
    restoreCandidate: (id: string) => void;
    reviewDiscarded: () => void;
    addCandidate: (candidate: Candidate) => void;
    editCandidate: (candidate: Candidate) => void;
    deleteCandidate: (id: string) => void;
    togglePriority: (id: string) => void;
    isPro: boolean;
    unlockPro: () => void;
    avaliacoes: number;
    canEvaluate: () => boolean;
    registerEvaluation: () => void;
};
const CandidatesContext = createContext<CandidatesContextType |
    null>(null);
export function CandidatesProvider({ children }: {
    children:
    React.ReactNode
}) {
    const [candidates, setCandidates] =
        useState<Candidate[]>(initialCandidates);
    const [isPro, setIsPro] = useState(false);
    const [avaliacoes, setAvaliacoes] = useState(0);
estado)----------
 const deck = useMemo(
        () => candidates.filter(c => c.status === 'Em análise'),
        [candidates]
    );
    const approvedCandidates = useMemo(
        () =>
            candidates
                .filter(c => c.status === 'Aprovado')
                .sort((a, b) => Number(!!b.priority) - Number(!!a.priority)),
        [candidates]
    );
    const setStatus = (id: string, status: Candidate['status'],
        priority?: boolean) => {
        setCandidates(prev =>
            prev.map(c =>
                c.id === id
                    ? {
                        ...c, status, priority: priority === undefined ?
                            c.priority : priority
                    }
                    : c
            )
        );
    };
    const approveCandidate = (id: string, priority = false) =>
        setStatus(id, 'Aprovado', priority);
    const discardCandidate = (id: string) => setStatus(id, 'Descartado',
        false);
    const restoreCandidate = (id: string) => setStatus(id, 'Em análise',
        false);
    const reviewDiscarded = () => {
        setCandidates(prev =>
            prev.map(c =>
                c.status === 'Descartado' ? {
                    ...c, status: 'Em análise' as
                        const
                } : c
            )
        );
    };
    const addCandidate = (newCandidate: Candidate) => {
        setCandidates(prev => [newCandidate, ...prev]);
    };
    const editCandidate = (updated: Candidate) => {
        setCandidates(prev => prev.map(c => (c.id === updated.id ? updated
            : c)));
    };
    const deleteCandidate = (id: string) => {
        setCandidates(prev => prev.filter(c => c.id !== id));
    };
    const togglePriority = (id: string) => {
        setCandidates(prev =>
            prev.map(c => (c.id === id ? { ...c, priority: !c.priority } :
                c))
        );
    };
    const canEvaluate = () => isPro || avaliacoes < FREE_LIMIT;
    const registerEvaluation = () => {
        if (!isPro) setAvaliacoes(n => n + 1);
    };
    const unlockPro = () => {
        setIsPro(true);
        setAvaliacoes(0);
    };
    return (
        <CandidatesContext.Provider
            value={{
                candidates,
                deck,
                approvedCandidates,
                approveCandidate,
                discardCandidate,
                restoreCandidate,
                reviewDiscarded,
                addCandidate,
                editCandidate,
                deleteCandidate,
                togglePriority,
                isPro,
                unlockPro,
                avaliacoes,
                canEvaluate,
                registerEvaluation,
            }}>
            {children}
        </CandidatesContext.Provider>
    );
}
export const useCandidates = () => {
    const ctx = useContext(CandidatesContext);
    if (!ctx) {
        throw new Error('useCandidates precisa estar dentro de
            < CandidatesProvider > ');
 }
    return ctx;
};
