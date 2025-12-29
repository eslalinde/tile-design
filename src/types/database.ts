export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      mosaics: {
        Row: {
          category: string
          created_at: string
          default_colors: Json | null
          description: string | null
          display_order: number
          height: number
          id: string
          is_active: boolean
          name: string
          rotation: Json
          shape: Database["public"]["Enums"]["mosaic_shape"]
          svg: string
          svg_version: string | null
          type: Database["public"]["Enums"]["mosaic_type"]
          updated_at: string
          width: number
        }
        Insert: {
          category: string
          created_at?: string
          default_colors?: Json | null
          description?: string | null
          display_order?: number
          height: number
          id?: string
          is_active?: boolean
          name: string
          rotation?: Json
          shape?: Database["public"]["Enums"]["mosaic_shape"]
          svg: string
          svg_version?: string | null
          type?: Database["public"]["Enums"]["mosaic_type"]
          updated_at?: string
          width: number
        }
        Update: {
          category?: string
          created_at?: string
          default_colors?: Json | null
          description?: string | null
          display_order?: number
          height?: number
          id?: string
          is_active?: boolean
          name?: string
          rotation?: Json
          shape?: Database["public"]["Enums"]["mosaic_shape"]
          svg?: string
          svg_version?: string | null
          type?: Database["public"]["Enums"]["mosaic_type"]
          updated_at?: string
          width?: number
        }
        Relationships: []
      }
      quotations: {
        Row: {
          admin_notes: string | null
          created_at: string
          currency: string | null
          id: string
          metadata: Json | null
          mosaic_snapshot: Json
          notes: string | null
          quoted_price: number | null
          status: Database["public"]["Enums"]["quotation_status"]
          updated_at: string
          user_id: string
          valid_until: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          metadata?: Json | null
          mosaic_snapshot: Json
          notes?: string | null
          quoted_price?: number | null
          status?: Database["public"]["Enums"]["quotation_status"]
          updated_at?: string
          user_id: string
          valid_until?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          metadata?: Json | null
          mosaic_snapshot?: Json
          notes?: string | null
          quoted_price?: number | null
          status?: Database["public"]["Enums"]["quotation_status"]
          updated_at?: string
          user_id?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_mosaics: {
        Row: {
          created_at: string
          id: string
          mosaic_id: string
          name: string | null
          preview_url: string | null
          state: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mosaic_id: string
          name?: string | null
          preview_url?: string | null
          state: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mosaic_id?: string
          name?: string | null
          preview_url?: string | null
          state?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_mosaics_mosaic_id_fkey"
            columns: ["mosaic_id"]
            isOneToOne: false
            referencedRelation: "mosaics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_mosaics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          accepted_habeas_data: boolean
          company: string | null
          created_at: string
          email: string
          habeas_data_accepted_at: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          accepted_habeas_data?: boolean
          company?: string | null
          created_at?: string
          email: string
          habeas_data_accepted_at?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          accepted_habeas_data?: boolean
          company?: string | null
          created_at?: string
          email?: string
          habeas_data_accepted_at?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      mosaic_shape: "square" | "hexagon" | "rectangle" | "g1"
      mosaic_type: "mosaic" | "border"
      quotation_status:
        | "pending"
        | "reviewed"
        | "quoted"
        | "accepted"
        | "rejected"
        | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never



