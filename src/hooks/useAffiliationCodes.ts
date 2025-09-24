import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AffiliationCode {
  id: string;
  code: string;
  name: string;
  tests: string[];
  discount_percent: number;
  is_active: boolean;
  usage_count: number;
  max_usage?: number;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AffiliationUsage {
  id: string;
  code_id: string;
  user_email: string;
  user_name: string;
  assessment_status: 'not_started' | 'in_progress' | 'completed';
  report_status: 'not_generated' | 'generated' | 'sent';
  discount_amount?: number;
  used_at: string;
  completed_at?: string;
  report_generated_at?: string;
  report_sent_at?: string;
  report_content?: string;
  report_url?: string;
  code: {
    code: string;
    name: string;
  };
}

export function useAffiliationCodes() {
  const [codes, setCodes] = useState<AffiliationCode[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCodes = async () => {
    try {
      const { data, error } = await supabase
        .from('affiliation_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCodes(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch affiliation codes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleCodeStatus = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('affiliation_codes')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;
      
      setCodes(prev => prev.map(code => 
        code.id === id ? { ...code, is_active: isActive } : code
      ));
      
      toast({
        title: 'Success',
        description: `Code ${isActive ? 'activated' : 'deactivated'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update code status',
        variant: 'destructive',
      });
    }
  };

  const createCode = async (codeData: {
    name: string;
    tests: string[];
    discount_percent?: number;
    max_usage?: number;
    expires_at?: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const code = `${codeData.name.toUpperCase().replace(/\s+/g, '')}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

      const { data, error } = await supabase
        .from('affiliation_codes')
        .insert({
          partner_id: user.id,
          code,
          name: codeData.name,
          tests: codeData.tests,
          discount_percent: codeData.discount_percent || 15,
          max_usage: codeData.max_usage,
          expires_at: codeData.expires_at,
        })
        .select()
        .single();

      if (error) throw error;
      
      setCodes(prev => [data, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Affiliation code created successfully',
      });

      return data;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create affiliation code',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  return {
    codes,
    loading,
    toggleCodeStatus,
    createCode,
    refetch: fetchCodes,
  };
}

export interface CodePerformance {
  id: string;
  code: string;
  name: string;
  expiresAt?: string;
  timesUsed: number;
  conversionRate: number;
  totalUsers: number;
  paidUsers: number;
  isActive: boolean;
}

export function useAffiliationUsage() {
  const [usage, setUsage] = useState<AffiliationUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsage = async () => {
    try {
      const { data, error } = await supabase
        .from('affiliation_usage')
        .select(`
          *,
          code:affiliation_codes(code, name)
        `)
        .order('used_at', { ascending: false });

      if (error) throw error;
      setUsage((data || []) as AffiliationUsage[]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch usage data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsage();
  }, []);

  return {
    usage,
    loading,
    refetch: fetchUsage,
  };
}

export function useCodePerformance() {
  const { codes, loading: codesLoading } = useAffiliationCodes();
  const { usage, loading: usageLoading } = useAffiliationUsage();
  const [performance, setPerformance] = useState<CodePerformance[]>([]);
  const loading = codesLoading || usageLoading;

  useEffect(() => {
    if (!loading && codes.length > 0) {
      const codePerformanceMap: Record<string, CodePerformance> = {};
      
      // Initialize performance data for all codes
      codes.forEach(code => {
        codePerformanceMap[code.id] = {
          id: code.id,
          code: code.code,
          name: code.name,
          expiresAt: code.expires_at,
          timesUsed: 0,
          conversionRate: 0,
          totalUsers: 0,
          paidUsers: 0,
          isActive: code.is_active,
        };
      });

      // Calculate usage statistics for each code
      usage.forEach(usageItem => {
        const codeId = usageItem.code_id || '';
        if (codePerformanceMap[codeId]) {
          codePerformanceMap[codeId].timesUsed++;
          codePerformanceMap[codeId].totalUsers++;
          
          if (usageItem.discount_amount && usageItem.discount_amount > 0) {
            codePerformanceMap[codeId].paidUsers++;
          }
        }
      });

      // Calculate conversion rates
      Object.values(codePerformanceMap).forEach(perf => {
        if (perf.totalUsers > 0) {
          perf.conversionRate = Math.round((perf.paidUsers / perf.totalUsers) * 100);
        }
      });

      setPerformance(Object.values(codePerformanceMap));
    }
  }, [codes, usage, loading]);

  return {
    performance,
    loading,
  };
}