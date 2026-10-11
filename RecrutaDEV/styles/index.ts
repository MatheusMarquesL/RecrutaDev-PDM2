import { StyleSheet } from 'react-native';
export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingTop: 12,
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    containerEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB'
    },
    emptyText: {
        fontSize: 16,
        color: '#6B7280',
        fontWeight: '600'
    },
    header: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 12
    },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    logoText: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
    badgeFree: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#F3E8FF', paddingHorizontal: 10, paddingVertical: 4,
        borderRadius: 12, gap: 4
    },
    badgeFreeText: {
        color: '#7C3AED', fontWeight: 'bold', fontSize: 12
    },
    subHeader: {
        flexDirection: 'row', justifyContent: 'space-between',
        marginTop: 16
    },
    subTitleLabel: {
        fontSize: 11, color: '#9CA3AF', fontWeight: 'bold'
    },
    disparosText: { fontSize: 11, color: '#6B7280', fontWeight: '600' },
    mainTitle: {
        fontSize: 20, fontWeight: 'bold', color: '#1F2937',
        marginBottom: 12
    },
    cardContainer: {
        flex: 1, borderRadius: 20, overflow: 'hidden',
        marginBottom: 16
    },
    cardInternal: {
        flex: 1, backgroundColor: '#FFF', borderRadius: 20,
        overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: {
            width: 0, height: 2
        }, shadowOpacity: 0.1, shadowRadius: 8
    },
    cardImage: { width: '100%', height: '65%' },
    fitBadge: {
        position: 'absolute', top: 16, left: 16, backgroundColor:
            '#10B981', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8
    },
    fitText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
    cardInfoOverlay: { padding: 16, backgroundColor: '#FFF', flex: 1 },
    cardName: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
    cardRole: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
    tagsRow: {
        flexDirection: 'row', flexWrap: 'wrap', gap: 6,
        marginBottom: 8
    },
    tag: {
        backgroundColor: '#F3E8FF', paddingHorizontal: 8,
        paddingVertical: 3, borderRadius: 6
    },
    tagText: { color: '#7C3AED', fontSize: 11, fontWeight: '600' },
    cardAbout: { fontSize: 12, color: '#4B5563' },
    priorityBadge: {
        position: 'absolute', top: 16, right: 16,
        backgroundColor: '#7C3AED', paddingHorizontal: 10, paddingVertical: 6,
        borderRadius: 20
    },
    priorityBadgeText: {
        color: '#FFF', fontWeight: 'bold', fontSize: 12
    },
    actionsBar: {
        flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center', gap: 24, marginBottom: 8
    },
    actionButtonDiscard: {
        width: 56, height: 56, borderRadius: 28,
        backgroundColor: '#FFF', justifyContent: 'center', alignItems:
            'center', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1
    },
    actionButtonRevert: {
        width: 44, height: 44, borderRadius: 22,
        backgroundColor: '#FFF', justifyContent: 'center', alignItems:
            'center', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1,
        position: 'relative'
    },
    miniLock: {
        position: 'absolute', bottom: -2, right: -2,
        backgroundColor: '#7C3AED', borderRadius: 6, padding: 2
    },
    actionButtonApprove: {
        width: 56, height: 56, borderRadius: 28,
        backgroundColor: '#7C3AED', justifyContent: 'center', alignItems:
            'center', elevation: 3, shadowColor: '#7C3AED', shadowOpacity: 0.3
    },
    gestureHint: {
        textAlign: 'center', fontSize: 11, color: '#9CA3AF',
        marginBottom: 12
    },
    modalOverlay: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: '#FFF', borderTopLeftRadius: 24,
        borderTopRightRadius: 24, padding: 24, maxHeight: '80%'
    },
    modalHeader: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 16
    },
    modalProfileRow: {
        flexDirection: 'row', alignItems: 'center', gap:
            12
    },
    modalAvatar: { width: 48, height: 48, borderRadius: 24 },
    modalName: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
    modalRole: { fontSize: 12, color: '#6B7280' },
    sectionTitle: {
        fontSize: 11, fontWeight: 'bold', color: '#9CA3AF',
        marginTop: 12, marginBottom: 4
    },
    sectionBody: { fontSize: 13, color: '#4B5563', lineHeight: 18 },
    salaryUnlocked: {
        fontSize: 15, fontWeight: 'bold', color: '#10B981'
    },
    salaryLockedContainer: {
        backgroundColor: '#F3F4F6', padding: 12,
        borderRadius: 8
    },
    salaryBlurred: {
        fontSize: 14, color: '#9CA3AF', textDecorationLine:
            'line-through', marginBottom: 4
    },
    proButtonInline: {
        flexDirection: 'row', alignItems: 'center', gap: 4
    },
    proButtonInlineText: {
        fontSize: 12, color: '#7C3AED', fontWeight:
            'bold'
    },
    visualizeProBtn: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#F3E8FF', padding: 12,
        borderRadius: 12, marginTop: 20, gap: 8
    },
    visualizeProBtnText: {
        color: '#7C3AED', fontWeight: 'bold',
        fontSize: 14
    },
    proModalCard: {
        backgroundColor: '#FFF', margin: 20, borderRadius:
            24, padding: 24, alignItems: 'center'
    },
    proCrownContainer: {
        width: 48, height: 48, borderRadius: 24,
        backgroundColor: '#F3E8FF', justifyContent: 'center', alignItems:
            'center', marginBottom: 12
    },
    proModalTitle: {
        fontSize: 18, fontWeight: 'bold', color: '#1F2937',
        textAlign: 'center', marginBottom: 4
    },
    proModalSub: {
        fontSize: 12, color: '#6B7280', textAlign: 'center',
        marginBottom: 16
    },
    plansRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
    planBoxFree: {
        flex: 1, backgroundColor: '#F9FAFB', padding: 12,
        borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB'
    },
    planBoxPro: {
        flex: 1, backgroundColor: '#FAF5FF', padding: 12,
        borderRadius: 12, borderWidth: 1, borderColor: '#7C3AED'
    },
    planTitle: {
        fontSize: 12, fontWeight: 'bold', color: '#6B7280',
        marginBottom: 8
    },
    planTitlePro: {
        fontSize: 12, fontWeight: 'bold', color: '#7C3AED',
        marginBottom: 8
    },
    planItem: { fontSize: 10, color: '#4B5563', marginBottom: 4 },
    planItemPro: {
        fontSize: 10, color: '#7C3AED', fontWeight: '600',
        marginBottom: 4
    },
    unlockButton: {
        backgroundColor: '#7C3AED', width: '100%', padding:
            14, borderRadius: 12, alignItems: 'center', marginBottom: 8
    },
    unlockButtonText: {
        color: '#FFF', fontWeight: 'bold', fontSize: 14
    },
    continueFreeButton: { padding: 8 },
    continueFreeText: {
        color: '#9CA3AF', fontSize: 12, fontWeight: '600'
    },
    emptyButton: {
        backgroundColor: '#7C3AED', paddingHorizontal: 20,
        paddingVertical: 12, borderRadius: 12, marginTop: 16
    },
    emptyButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
    segmentRow: {
        flexDirection: 'row', backgroundColor: '#F3F4F6',
        borderRadius: 10, padding: 4, marginBottom: 12
    },
    segmentButton: {
        flex: 1, paddingVertical: 8, borderRadius: 8,
        alignItems: 'center'
    },
    segmentButtonActive: {
        backgroundColor: '#FFF', elevation: 1,
        shadowColor: '#000', shadowOpacity: 0.05
    },
    segmentText: { fontSize: 12, fontWeight: 'bold', color: '#9CA3AF' },
    segmentTextActive: { color: '#7C3AED' },
    input: {
        backgroundColor: '#F3F4F6', padding: 12, borderRadius: 8,
        fontSize: 14
    },
    primaryButton: {
        backgroundColor: '#7C3AED', padding: 14,
        borderRadius: 12, alignItems: 'center', marginTop: 20, marginBottom: 8
    },
    primaryButtonText: {
        color: '#FFF', fontWeight: 'bold', fontSize: 14
    },
    smallButton: {
        backgroundColor: '#F3E8FF', paddingHorizontal: 10,
        paddingVertical: 6, borderRadius: 8
    },
    smallButtonText: {
        color: '#7C3AED', fontWeight: 'bold', fontSize: 12
    },
    addButton: {
        backgroundColor: '#7C3AED', paddingHorizontal: 12,
        paddingVertical: 6, borderRadius: 12, flexDirection: 'row', alignItems:
            'center', gap: 4
    },
    addButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
    formAvatar: {
        width: 80, height: 80, borderRadius: 40, marginBottom:
            8
    },
    statusTextMuted: {
        fontSize: 11, color: '#6B7280', fontWeight: '600'
    },
    priorityHeaderBox: {
        backgroundColor: '#F3E8FF', paddingHorizontal:
            12, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start',
        marginBottom: 12
    },
    priorityHeaderText: {
        color: '#7C3AED', fontWeight: 'bold', fontSize:
            11
    },
    listContainer: { gap: 12, paddingBottom: 24 },
    candidateCard: {
        flexDirection: 'row', backgroundColor: '#FFF',
        padding: 16, borderRadius: 16, alignItems: 'center', elevation: 2,
        shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6
    },
    avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
    infoContainer: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
    role: { fontSize: 12, color: '#6B7280', marginBottom: 6 },
    statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    statusDot: {
        width: 8, height: 8, borderRadius: 4, backgroundColor:
            '#10B981'
    },
    statusText: { fontSize: 11, color: '#10B981', fontWeight: '600' },
    cardPhotoBox: { width: '100%', height: '65%', overflow: 'hidden' },
    cardImageFull: { width: '100%', height: '100%' },
    dragHandle: {
        width: 40, height: 4, backgroundColor: '#D1D5DB',
        borderRadius: 2, alignSelf: 'center', marginBottom: 12
    },
});
